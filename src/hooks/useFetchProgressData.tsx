import { useEffect, useState, useRef } from 'react';

export function useFetchProgressData(
	fetchUrl: string,
	setAlertToggle: (input: boolean) => void,
	setErrorId: (input: number | null) => void,
	setResult?: (result: any) => void,
	setLoading?: (loading: boolean) => void,
	simulationId?: string,
) {
	const [progress, setProgress] = useState<number>(0);
	const [status, setStatus] = useState<string>('Beginning simulation');
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const hasFetchedResult = useRef<boolean>(false);

	useEffect(() => {
		// Reset hasFetchedResult when fetchUrl changes
		hasFetchedResult.current = false;

		// Initial delay before starting polling
		const initialDelay = setTimeout(() => {
			intervalRef.current = setInterval(async () => {
				try {
					const response = await fetch(fetchUrl);
					const data = await response.json();

					if (data.error === 99) {
						setAlertToggle(true);
						setErrorId(99);
						console.error('Error 99: Server unexpected error');
						if (intervalRef.current) {
							clearInterval(intervalRef.current);
							intervalRef.current = null;
						}
						if (setLoading) {
							setLoading(false);
						}
					} else if (data.error === 100) {
						setAlertToggle(true);
						setErrorId(100);
						console.error('Error 100: Server is not responding');
						if (intervalRef.current) {
							clearInterval(intervalRef.current);
							intervalRef.current = null;
						}
						if (setLoading) {
							setLoading(false);
						}
					} else {
						console.log(
							'Status checked, progress: ',
							data.progress,
						);
						setProgress(data.progress);
						setStatus(data.status);

						// Check if simulation is completed
						if (
							data.completed &&
							!hasFetchedResult.current &&
							simulationId
						) {
							hasFetchedResult.current = true;

							// Stop polling
							if (intervalRef.current) {
								clearInterval(intervalRef.current);
								intervalRef.current = null;
							}

							// Fetch result
							try {
								const backendUrl = import.meta.env
									.VITE_BACKEND_URL;
								const resultResponse = await fetch(
									`${backendUrl}/result/${simulationId}`,
								);

								if (resultResponse.ok) {
									const resultData =
										await resultResponse.json();

									if (setResult) {
										setResult(resultData.dispersion);
									}
									if (setErrorId) {
										setErrorId(resultData.errorId);
									}
									if (resultData.errorId !== 0) {
										setAlertToggle(true);
									}
									if (setLoading) {
										setLoading(false);
									}
									console.log('Result fetched successfully');
									console.log(
										'Result:',
										resultData.dispersion,
									);
								} else if (resultResponse.status === 202) {
									// Result not ready yet, continue polling
									hasFetchedResult.current = false;
									if (intervalRef.current === null) {
										intervalRef.current = setInterval(
											async () => {
												// This will be handled by the next iteration
											},
											2000,
										);
									}
								} else {
									throw new Error(
										`Failed to fetch result: ${resultResponse.status}`,
									);
								}
							} catch (error) {
								console.error('Error fetching result:', error);
								setAlertToggle(true);
								setErrorId(99);
								if (setLoading) {
									setLoading(false);
								}
							}
						} else if (
							data.error !== 0 &&
							data.error !== undefined
						) {
							// Simulation completed with error
							if (intervalRef.current) {
								clearInterval(intervalRef.current);
								intervalRef.current = null;
							}
							if (setLoading) {
								setLoading(false);
							}
							if (data.error !== 0) {
								setAlertToggle(true);
							}
						}
					}
				} catch (error) {
					console.error('Error fetching status:', error);
					setAlertToggle(true);
					setErrorId(100);
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
					}
					if (setLoading) {
						setLoading(false);
					}
				}
			}, 2000);
		}, 3000);

		// Cleanup function
		return () => {
			clearTimeout(initialDelay);
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [
		fetchUrl,
		simulationId,
		setAlertToggle,
		setErrorId,
		setResult,
		setLoading,
	]);

	return { progress, status };
}
