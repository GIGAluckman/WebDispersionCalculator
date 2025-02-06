import { MaterialType } from './constants/materialTypes';
import { GeometryType } from './constants/geometryTypes';
import { ExperimentType } from './constants/experimentTypes';
import ProgressBar from './components/ProgressBar';
import SimulationResult from './components/SimulationResult';
import Header from './components/Header';
import MainForm from './components/MainForm';
import Credits from './components/Credits';
import Alert from './components/Alert';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MainSelect } from './components/MainSelect';

function App() {
	const [chosenGeometry, setChosenGeometry] = useState<GeometryType>(
		GeometryType.Waveguide
	);
	const [chosenMaterial, setChosenMaterial] = useState<MaterialType>(
		MaterialType.YIG
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
			<MainSelect
				chosenExperiment={chosenExperiment}
				chosenGeometry={chosenGeometry}
				chosenMaterial={chosenMaterial}
				setChosenExperiment={setChosenExperiment}
				setChosenGeometry={setChosenGeometry}
				setChosenMaterial={setChosenMaterial}
			/>
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
			<hr />
			<Credits />
		</div>
	);
}

export default App;
