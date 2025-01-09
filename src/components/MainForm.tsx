import { Materials } from '../constants/materialTypes';
import { Geometries } from '../constants/geometryTypes';
import ExpSetupForm from './ExpSetupForm';
import MaterialForm from './MaterialForm';
import GeometryForm from './GeometryForm';

interface MainFormProps {
	chosenGeometry: Geometries;
	chosenMaterial: Materials;
	onReset: () => void;
}

export default function MainForm({
	chosenGeometry,
	chosenMaterial,
	onReset,
}: MainFormProps) {
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		// Prevent the browser from reloading the page
		e.preventDefault();

		// Read the form data
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		// You can pass formData as a fetch body directly:
		// fetch('/some-api', { method: form.method, body: formData });

		// Or you can work with it as a plain object:
		const formJson = Object.fromEntries(formData.entries());
		formJson['chosenGeometry'] = chosenGeometry;
		console.log(formJson);

		try {
			const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/submit`;
			const response = await fetch(backendUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formJson),
			});

			const result = await response.json();
			console.log('Server response: ', result);
		} catch (error) {
			console.error('Server error: ', error);
		}
	}

	return (
		<form method="post" onSubmit={handleSubmit} onReset={onReset}>
			<div className="row">
				<div className="col">
					<GeometryForm chosenGeometry={chosenGeometry} />
				</div>
				<div className="col">
					<ExpSetupForm chosenGeometry={chosenGeometry} />
				</div>
				<div className="col">
					<MaterialForm chosenMaterial={chosenMaterial} />
				</div>
			</div>
			<button type="reset">Reset form</button>
			<button type="submit">Submit form</button>
		</form>
	);
}
