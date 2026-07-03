import { MaterialType } from './constants/materialTypes';
import { GeometryType } from './constants/geometryTypes';
import {
	ExperimentType,
	SimulationResultData,
} from './constants/experimentTypes';
import ProgressBar from './components/ProgressBar';
import SimulationResult from './components/SimulationResult';
import Header from './components/Header';
import MainForm from './components/MainForm';
import Credits from './components/Credits';
import Alert from './components/Alert';
import { useState } from 'react';
import { MainSelect } from './components/MainSelect';

function App() {
	const [chosenGeometry, setChosenGeometry] = useState<GeometryType>(
		GeometryType.Waveguide,
	);
	const [chosenMaterial, setChosenMaterial] = useState<MaterialType>(
		MaterialType.YIG,
	);
	const [chosenExperiment, setChosenExperiment] = useState<ExperimentType>(
		ExperimentType.dispersion,
	);

	const [loading, setLoading] = useState(false);
	const [simulationId, setSimulationId] = useState<string>(() =>
		crypto.randomUUID(),
	);
	const [result, setResult] = useState<SimulationResultData | null>(null);
	const [errorId, setErrorId] = useState<number | null>(null);

	const [alertToggle, setAlertToggle] = useState(false);

	// Each submission gets a fresh id so a rerun can never pick up the
	// previous run's status or result.
	const startNewSimulation = (): string => {
		const newId = crypto.randomUUID();
		setSimulationId(newId);
		setResult(null);
		setErrorId(null);
		setAlertToggle(false);
		return newId;
	};

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
				startNewSimulation={startNewSimulation}
				loading={loading}
				chosenGeometry={chosenGeometry}
				chosenMaterial={chosenMaterial}
				chosenExperiment={chosenExperiment}
				setLoading={setLoading}
				setErrorId={setErrorId}
				onReset={() => {
					setChosenMaterial(MaterialType.Custom);
					setChosenGeometry(GeometryType.Waveguide);
				}}
				setAlertToggle={setAlertToggle}
			/>
			{loading ? (
				<ProgressBar
					simulationId={simulationId}
					setAlertToggle={setAlertToggle}
					setErrorId={setErrorId}
					setResult={setResult}
					setLoading={setLoading}
				/>
			) : null}
			<Alert
				errorId={errorId}
				show={alertToggle}
				onClose={() => setAlertToggle(false)}
			/>
			<SimulationResult
				result={result}
				chosenExperiment={chosenExperiment}
				errorId={errorId}
				simulationId={simulationId}
				simulationLoading={loading}
			/>
			<hr />
			<Credits />
		</div>
	);
}

export default App;
