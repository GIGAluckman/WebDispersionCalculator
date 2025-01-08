import Header from './components/Header';
import availableMaterials, { Materials } from './constants/materialTypes';
import availableGeometries, { Geometries } from './constants/geometryTypes';
import Select from './components/Select';
import MainForm from './components/MainForm';
import { useState } from 'react';

function App() {
	const [chosenGeometry, setChosenGeometry] = useState<Geometries>(
		Geometries.Waveguide
	);
	const [chosenMaterial, setChosenMaterial] = useState<Materials>(
		Materials.custom
	);

	return (
		<div>
			<Header title="Dispersion calculator" />
			<hr />
			<div className="container text-center">
				<div className="row">
					<div className="col">
						<Select
							name="selectGeometry"
							allOptions={availableGeometries}
							defaultValue={chosenGeometry}
							setChosenOption={setChosenGeometry}
							label="Select a geometry: "
						/>
					</div>
					<div className="col">
						<Select
							name="selectMaterial"
							allOptions={availableMaterials}
							defaultValue={chosenMaterial}
							setChosenOption={setChosenMaterial}
							label="Select a material: "
						/>
					</div>
				</div>
			</div>
			<hr />
			<MainForm
				chosenGeometry={chosenGeometry}
				chosenMaterial={chosenMaterial}
				onReset={() => {
					setChosenMaterial(Materials.custom);
					setChosenGeometry(Geometries.Waveguide);
				}}
			/>
		</div>
	);
}

export default App;
