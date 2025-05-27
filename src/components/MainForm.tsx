import { MaterialType } from '../constants/materialTypes';
import { GeometryType } from '../constants/geometryTypes';
import { ExperimentType } from '../constants/experimentTypes';
import ExpSetupForm from './ExpSetupForm';
import MaterialForm from './MaterialForm';
import GeometryForm from './GeometryForm';
import styles from './styles/MainForm.module.css';
import { useState } from 'react';
import { useFormSubmit } from '../hooks/useFormSubmit';

interface AlertObject {
	message: string;
	show: boolean;
}

interface MainFormProps {
	simulationId: string;
	loading: boolean;
	chosenGeometry: GeometryType;
	chosenMaterial: MaterialType;
	chosenExperiment: ExperimentType;
	setLoading: (loading: boolean) => void;
	setResult: (result: any) => void;
	onReset: () => void;
	setAlert: (input: AlertObject) => void;
}

export default function MainForm({
	simulationId,
	loading,
	chosenGeometry,
	chosenMaterial,
	chosenExperiment,
	setLoading,
	setResult,
	onReset,
	setAlert,
}: MainFormProps) {
	const [showAdvanced, setShowAdvanced] = useState(false);
	const { handleSubmit } = useFormSubmit({
		simulationId,
		chosenGeometry,
		chosenMaterial,
		chosenExperiment,
		setLoading,
		setResult,
		setAlert,
	});

	return (
		<form method="post" onSubmit={handleSubmit} onReset={onReset}>
			<div className={styles.colcontainer}>
				<div className={styles.col + ' p-2'}>
					<GeometryForm
						chosenMaterial={chosenMaterial}
						chosenGeometry={chosenGeometry}
						showAdvanced={showAdvanced}
					/>
				</div>
				<div className={styles.col + ' p-2'}>
					<MaterialForm chosenMaterial={chosenMaterial} />
				</div>
				<div className={styles.col + ' p-2'}>
					<ExpSetupForm
						chosenExperiment={chosenExperiment}
						showAdvanced={showAdvanced}
					/>
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<div className={styles.colbut + ' p-2 align-self-start'}>
					<button type="reset" className="btn btn-primary me-2">
						Reset Data
					</button>
					<button
						type="submit"
						disabled={loading}
						className="btn btn-primary me-2"
					>
						{loading
							? 'Simulation in progress...'
							: 'Start Simulation'}
					</button>
					<button
						type="button"
						onClick={() => setShowAdvanced(!showAdvanced)}
						className="btn btn-secondary me-2"
					>
						{showAdvanced
							? 'Delete Advanced Settings'
							: 'Use Advanced Settings'}
					</button>
				</div>
			</div>
		</form>
	);
}
