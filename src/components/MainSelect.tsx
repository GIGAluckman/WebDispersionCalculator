import availableExperiments, {
	ExperimentType,
} from '../constants/experimentTypes';
import availableGeometries, { GeometryType } from '../constants/geometryTypes';
import availableMaterials, { MaterialType } from '../constants/materialTypes';
import Select from './Select';
import styles from './styles/MainSelect.module.css';

interface MainSelectProps {
	chosenGeometry: string;
	setChosenGeometry: (option: GeometryType) => void;
	chosenMaterial: string;
	setChosenMaterial: (option: MaterialType) => void;
	chosenExperiment: string;
	setChosenExperiment: (option: ExperimentType) => void;
}

export function MainSelect({
	chosenExperiment,
	chosenGeometry,
	chosenMaterial,
	setChosenExperiment,
	setChosenGeometry,
	setChosenMaterial,
}: MainSelectProps) {
	return (
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
	);
}
