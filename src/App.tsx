import availableMaterials, { MaterialType } from './constants/materialTypes';
import availableGeometries, { GeometryType } from './constants/geometryTypes';
import availableExperiments, { Experiment } from './constants/experimentTypes';
import Header from './components/Header';
import Select from './components/Select';
import MainForm from './components/MainForm';
import styles from './App.module.css';
import { useState } from 'react';

function App() {
	const [chosenGeometry, setChosenGeometry] = useState<GeometryType>(
		GeometryType.Waveguide
	);
	const [chosenMaterial, setChosenMaterial] = useState<MaterialType>(
		MaterialType.Custom
	);
	const [chosenExperiment, setChosenExperiment] = useState<Experiment>(
		Experiment.dispersion
	);

	return (
		<div>
			<Header title="Dispersion calculator" />
			<hr />

			<div className="d-flex justify-content-center">
				<div className={styles.col + ' p-2'}>
					<Select
						name="selectGeometry"
						allOptions={availableGeometries}
						defaultValue={chosenGeometry}
						setChosenOption={setChosenGeometry}
						label="Select a geometry: "
					/>
				</div>
				<div className={styles.col + ' p-2'}>
					<Select
						name="selectMaterial"
						allOptions={availableMaterials}
						defaultValue={chosenMaterial}
						setChosenOption={setChosenMaterial}
						label="Select a material: "
					/>
				</div>
				<div className={styles.col + ' p-2'}>
					<Select
						name="selectExperiment"
						allOptions={availableExperiments}
						defaultValue={chosenExperiment}
						setChosenOption={setChosenExperiment}
						label="Select an experiment type: "
					/>

					<div className="col"></div>
				</div>
			</div>
			<hr />
			<MainForm
				chosenGeometry={chosenGeometry}
				chosenMaterial={chosenMaterial}
				chosenExperiment={chosenExperiment}
				onReset={() => {
					setChosenMaterial(MaterialType.Custom);
					setChosenGeometry(GeometryType.Waveguide);
				}}
			/>
		</div>
	);
}

export default App;
