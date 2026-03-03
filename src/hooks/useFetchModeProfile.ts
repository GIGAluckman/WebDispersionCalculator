import { useState, useCallback } from 'react';
import type { ModeProfileData } from '../components/ModeProfilePlot';

interface UseFetchModeProfileParams {
	simulationId: string;
	numberOfModes: number;
}

export function useFetchModeProfile({
	simulationId,
	numberOfModes,
}: UseFetchModeProfileParams) {
	const [data, setData] = useState<ModeProfileData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchModeProfile = useCallback(
		async (mode: number) => {
			if (
				isNaN(mode) ||
				mode < 0 ||
				mode >= numberOfModes
			) {
				setError(
					`Mode must be between 0 and ${numberOfModes - 1}`,
				);
				setData(null);
				return;
			}
			setError(null);
			setLoading(true);
			setData(null);
			try {
				const backendUrl = import.meta.env.VITE_BACKEND_URL;
				const res = await fetch(
					`${backendUrl}/get_mode_profile/${simulationId}/${mode}/`,
				);
				if (!res.ok) {
					const errData = await res.json().catch(() => ({}));
					throw new Error(
						errData.error || `HTTP ${res.status}`,
					);
				}
				const result = await res.json();
				setData(result);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to load mode profile',
				);
			} finally {
				setLoading(false);
			}
		},
		[simulationId, numberOfModes],
	);

	return { data, loading, error, fetchModeProfile };
}
