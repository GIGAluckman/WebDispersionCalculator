import { MaterialType } from '../constants/materialTypes';
import { GeometryType } from '../constants/geometryTypes';
import { Experiment } from '../constants/experimentTypes';
import ExpSetupForm from './ExpSetupForm';
import MaterialForm from './MaterialForm';
import GeometryForm from './GeometryForm';
import SimulationResult from './SimulationResult';
import styles from './MainForm.module.css';
import { useState } from 'react';

interface MainFormProps {
	chosenGeometry: GeometryType;
	chosenMaterial: MaterialType;
	chosenExperiment: Experiment;
	onReset: () => void;
}

export default function MainForm({
	chosenGeometry,
	chosenMaterial,
	chosenExperiment,
	onReset,
}: MainFormProps) {
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

		try {
			const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/submit`;
			const response = await fetch(backendUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formJson),
			});

			const recievedData = await response.json();
			console.log('Recieved data: ', recievedData);
			setResult(recievedData);
		} catch (error) {
			console.error('Server error: ', error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<form method="post" onSubmit={handleSubmit} onReset={onReset}>
			<div className="d-flex justify-content-center">
				<div className={styles.col + ' p-2'}>
					<GeometryForm chosenGeometry={chosenGeometry} />
				</div>
				<div className={styles.col + ' p-2'}>
					<MaterialForm chosenMaterial={chosenMaterial} />
				</div>
				<div className={styles.col + ' p-2'}>
					<ExpSetupForm chosenExperiment={chosenExperiment} />
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<div className={styles.colbut + ' p-2 align-self-start'}>
					<button type="reset" className={styles.button + ' me-2'}>
						Reset data
					</button>
					<button type="submit" disabled={loading}>
						{loading
							? 'Simulation in progress...'
							: 'Start Simulation'}
					</button>
				</div>
			</div>
			<SimulationResult
				result={result}
				chosenExperiment={chosenExperiment}
			/>
		</form>
	);
}
