import { useState } from 'react';
import type { ModeProfileData } from '../components/ModeProfilePlot';

interface UseFetchModeProfileParams {
	simulationId: string;
}

export function useFetchModeProfile({
	simulationId,
}: UseFetchModeProfileParams) {
	const [data, setData] = useState<ModeProfileData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [component, setComponent] = useState<'x' | 'y' | 'z'>('x');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries()) as Record<
			string,
			string
		>;
		formJson['id'] = simulationId;

		const comp = (formJson.component ?? 'x') as 'x' | 'y' | 'z';
		if (!['x', 'y', 'z'].includes(comp)) {
			setError('Component must be x, y, or z');
			setLoading(false);
			return;
		}

		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			const res = await fetch(`${backendUrl}/get_mode_profile`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formJson),
			});

			if (!res.ok) {
				const errData = await res.json().catch(() => ({}));
				throw new Error(
					(errData as { error?: string }).error ||
						`HTTP ${res.status}`,
				);
			}
			const result = (await res.json()) as ModeProfileData;
			setData(result);
			setComponent(comp);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Failed to load mode profile',
			);
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, component, handleSubmit };
}
