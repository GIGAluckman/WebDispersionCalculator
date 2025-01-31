import availableMaterials, { MaterialType } from './constants/materialTypes';
import availableGeometries, { GeometryType } from './constants/geometryTypes';
import availableExperiments, {
	ExperimentType,
} from './constants/experimentTypes';
import ProgressBar from './components/ProgressBar';
import SimulationResult from './components/SimulationResult';
import Header from './components/Header';
import Select from './components/Select';
import MainForm from './components/MainForm';
import Credits from './components/Credits';
import Alert from './components/Alert';
import styles from './App.module.css';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
	const [chosenGeometry, setChosenGeometry] = useState<GeometryType>(
		GeometryType.Waveguide
	);
	const [chosenMaterial, setChosenMaterial] = useState<MaterialType>(
		MaterialType.Custom
	);
	const [chosenExperiment, setChosenExperiment] = useState<ExperimentType>(
		ExperimentType.dispersion
	);

	const [loading, setLoading] = useState(false);
	const simulationId = useRef(uuidv4());
	const [result, setResult] = useState(null);

	const [alertObject, setAlertObject] = useState({
		message: '',
		show: false,
	});

	return (
		<div>
			<Header title="Dispersion calculator" />
			<hr />

			<div className="d-flex justify-content-center">
				<div className={styles.col}>
					<Select
						name="selectGeometry"
						allOptions={availableGeometries}
						defaultValue={chosenGeometry}
						setChosenOption={setChosenGeometry}
						label="Select a geometry: "
					/>
				</div>
				<div className={styles.col}>
					<Select
						name="selectMaterial"
						allOptions={availableMaterials}
						defaultValue={chosenMaterial}
						setChosenOption={setChosenMaterial}
						label="Select a material: "
					/>
				</div>
				<div className={styles.col}>
					<Select
						name="selectExperiment"
						allOptions={availableExperiments}
						defaultValue={chosenExperiment}
						setChosenOption={setChosenExperiment}
						label="Select an experiment: "
					/>

					<div className="col"></div>
				</div>
			</div>
			<hr />
			<MainForm
				simulationId={simulationId.current}
				loading={loading}
				chosenGeometry={chosenGeometry}
				chosenMaterial={chosenMaterial}
				chosenExperiment={chosenExperiment}
				setLoading={setLoading}
				setResult={setResult}
				onReset={() => {
					setChosenMaterial(MaterialType.Custom);
					setChosenGeometry(GeometryType.Waveguide);
				}}
				setAlert={setAlertObject}
			/>
			{loading ? (
				<ProgressBar simulationId={simulationId.current} />
			) : null}
			<SimulationResult
				result={result}
				chosenExperiment={chosenExperiment}
			/>
			<Alert
				message={alertObject.message}
				show={alertObject.show}
				onClose={() => setAlertObject({ message: '', show: false })}
			/>
			<Credits />
		</div>
	);
}

export default App;
