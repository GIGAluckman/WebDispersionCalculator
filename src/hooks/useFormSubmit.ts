import { MaterialType } from '../constants/materialTypes';
import { GeometryType } from '../constants/geometryTypes';
import { ExperimentType } from '../constants/experimentTypes';

interface AlertObject {
	message: string;
	show: boolean;
}

interface UseFormSubmitProps {
	simulationId: string;
	chosenGeometry: GeometryType;
	chosenMaterial: MaterialType;
	chosenExperiment: ExperimentType;
	setLoading: (loading: boolean) => void;
	setResult: (result: any) => void;
	setAlert: (input: AlertObject) => void;
}

export const useFormSubmit = ({
	simulationId,
	chosenGeometry,
	chosenMaterial,
	chosenExperiment,
	setLoading,
	setResult,
	setAlert,
}: UseFormSubmitProps) => {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// Prevent the browser from reloading the page
		setLoading(true);
		e.preventDefault();

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
			// Sending the data to the backend
			const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/submit`;
			const response = await fetch(backendUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formJson),
			});

			const recievedData = await response.json();
			setResult(recievedData);
		} catch (error) {
			setAlert({
				message:
					'An unexpected error occurred. Please contact the developer.',
				show: true,
			});
			console.error('Server error: ', error);
		} finally {
			setLoading(false);
		}
	};

	return { handleSubmit };
};
