import { useEffect, useState } from 'react';
import { SimulationResultData } from '../constants/experimentTypes';
import { CONNECTION_ERROR } from '../constants/errorCodes';

const POLL_INTERVAL_MS = 2000;
const INITIAL_DELAY_MS = 3000;
// A single failed poll (Wi-Fi blip, backend restart) must not abandon a
// running simulation — only give up after this many failures in a row.
const MAX_CONSECUTIVE_FAILURES = 4;

export function useFetchProgressData(
	fetchUrl: string,
	setAlertToggle: (input: boolean) => void,
	setErrorId: (input: number | null) => void,
	setResult?: (result: SimulationResultData) => void,
	setLoading?: (loading: boolean) => void,
	simulationId?: string,
) {
	const [progress, setProgress] = useState<number>(0);
	const [status, setStatus] = useState<string>('Beginning simulation');
	const [attempt, setAttempt] = useState<number>(1);

	useEffect(() => {
		const abort = new AbortController();
		let intervalId: ReturnType<typeof setInterval> | null = null;
		let inFlight = false;
		let finished = false;
		let consecutiveFailures = 0;

		const stopPolling = () => {
			finished = true;
			if (intervalId !== null) {
				clearInterval(intervalId);
				intervalId = null;
			}
		};

		const fail = (errorId: number) => {
			stopPolling();
			setErrorId(errorId);
			setAlertToggle(true);
			setLoading?.(false);
		};

		// Returns 'done' when the result was fetched, 'not-ready' on HTTP 202.
		const fetchResult = async (): Promise<'done' | 'not-ready'> => {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			const resultResponse = await fetch(
				`${backendUrl}/result/${simulationId}`,
				{ signal: abort.signal },
			);
			// 202 must be checked before .ok — 202 is an "ok" status
			if (resultResponse.status === 202) {
				return 'not-ready';
			}
			if (!resultResponse.ok) {
				throw new Error(
					`Failed to fetch result: ${resultResponse.status}`,
				);
			}
			const resultData = await resultResponse.json();
			stopPolling();
			setResult?.({
				dispersion: resultData.dispersion,
				numberOfModes: resultData.numberOfModes ?? 3,
			});
			setErrorId(resultData.errorId);
			if (resultData.errorId !== 0) {
				setAlertToggle(true);
			}
			setLoading?.(false);
			return 'done';
		};

		const tick = async () => {
			// Don't stack a new request while the previous one is still running
			if (inFlight || finished) return;
			inFlight = true;
			try {
				const response = await fetch(fetchUrl, {
					signal: abort.signal,
				});
				if (!response.ok) {
					throw new Error(
						`Status request failed: ${response.status}`,
					);
				}
				const data = await response.json();
				consecutiveFailures = 0;

				setProgress(data.progress ?? 0);
				setStatus(data.status ?? '');
				setAttempt(data.attempt ?? 1);

				if (data.completed) {
					const outcome = await fetchResult();
					if (outcome === 'not-ready') {
						if (data.error !== 0 && data.error !== undefined) {
							// A failed job never produces a result file —
							// surface its error code instead of polling forever
							fail(data.error);
						}
						// else: result file not written yet, keep polling
					}
				}
			} catch (error) {
				if (abort.signal.aborted) return;
				consecutiveFailures += 1;
				console.error(
					`Error fetching status (attempt ${consecutiveFailures}/${MAX_CONSECUTIVE_FAILURES}):`,
					error,
				);
				if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
					fail(CONNECTION_ERROR);
				}
			} finally {
				inFlight = false;
			}
		};

		// Initial delay before starting polling
		const initialDelay = setTimeout(() => {
			intervalId = setInterval(tick, POLL_INTERVAL_MS);
		}, INITIAL_DELAY_MS);

		// Cleanup function
		return () => {
			clearTimeout(initialDelay);
			abort.abort();
			stopPolling();
		};
	}, [
		fetchUrl,
		simulationId,
		setAlertToggle,
		setErrorId,
		setResult,
		setLoading,
	]);

	return { progress, status, attempt };
}
