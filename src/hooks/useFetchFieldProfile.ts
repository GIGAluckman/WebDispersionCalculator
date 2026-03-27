import { useState } from 'react';
import type { GridMeshData } from '../components/GridPlot';

export type FieldProfileMeshData = GridMeshData & {
	geometry_type: 'Waveguide' | 'Plane Film' | 'Wire';
	field_name: string;
};

interface UseFetchFieldProfileParams {
	simulationId: string;
}

export function useFetchFieldProfile({
	simulationId,
}: UseFetchFieldProfileParams) {
	const [data, setData] = useState<FieldProfileMeshData | null>(null);
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
		console.log('Asked for field profile:', formJson);

		const comp = (formJson.component ?? 'x') as 'x' | 'y' | 'z';

		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			const res = await fetch(`${backendUrl}/get_field_profile`, {
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
			const result = (await res.json()) as FieldProfileMeshData;
			setData(result);
			setComponent(comp);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Failed to load field profile',
			);
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, component, handleSubmit };
}
