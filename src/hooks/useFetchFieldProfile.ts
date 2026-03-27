import { useState, useCallback } from 'react';
import type { GridMeshData } from '../components/GridPlot';
import { FieldNames } from '../constants/fieldFetchingTypes';

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
	const [fieldName, setFieldName] = useState<FieldNames | null>(null);

	const fetchWithParams = useCallback(
		async (params: Record<string, string>) => {
			const formJson: Record<string, string> = {
				...params,
				id: simulationId,
			};
			console.log('Asked for field profile:', formJson);

			const comp = (formJson.component ?? 'x') as 'x' | 'y' | 'z';
			const fieldName = (formJson.fieldName ??
				FieldNames.DemagField) as FieldNames;

			setError(null);
			setLoading(true);
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
				setFieldName(fieldName);
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
		},
		[simulationId],
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const formJson = Object.fromEntries(formData.entries()) as Record<
			string,
			string
		>;
		await fetchWithParams(formJson);
	};

	return {
		data,
		loading,
		error,
		component,
		fieldName,
		handleSubmit,
		fetchWithParams,
	};
}
