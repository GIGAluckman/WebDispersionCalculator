import { MaterialType } from '../constants/materialTypes';
import { GeometryType } from '../constants/geometryTypes';
import { ExperimentType } from '../constants/experimentTypes';

interface UseFormSubmitProps {
	simulationId: string;
	chosenGeometry: GeometryType;
	chosenMaterial: MaterialType;
	chosenExperiment: ExperimentType;
	setLoading: (loading: boolean) => void;
	setAlertToggle: (input: boolean) => void;
	setErrorId: (errorId: number | null) => void;
}

export const useFormSubmit = ({
	simulationId,
	chosenGeometry,
	chosenMaterial,
	chosenExperiment,
	setLoading,
	setAlertToggle,
	setErrorId,
}: UseFormSubmitProps) => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// Prevent the browser from reloading the page
		e.preventDefault();
		setLoading(true);

		// Read the form data
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		// Or you can work with it as a plain object:
		const formJson = Object.fromEntries(formData.entries());

		formJson['chosenGeometry'] = chosenGeometry;
		formJson['chosenExperiment'] = chosenExperiment;
		formJson['chosenMaterial'] = chosenMaterial;
		formJson['id'] = simulationId;

		try {
			// Sending the data to the backend to start the simulation
			const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/start`;
			const response = await fetch(backendUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formJson),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const receivedData = await response.json();
			console.log('Simulation started:', receivedData);

			// Don't set loading to false here - keep it true so polling can start
			// The result will be fetched by useFetchProgressData when status shows completion
		} catch (error) {
			setLoading(false);
			setAlertToggle(true);
			setErrorId(100);
			console.error('Server error: ', error);
		}
	};

	return { handleSubmit };
};
