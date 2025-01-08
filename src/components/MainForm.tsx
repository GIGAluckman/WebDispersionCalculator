import TextInput from './TextInput';
import RadioInput from './RadioInput';
import { materialParameters, Materials } from '../constants/materialTypes';
import { Geometries, geometryParameters } from '../constants/geometryTypes';
import { inputMaterialLoopParams } from '../constants/inputMaterialLoopParams';
import { MaterialParameterNames } from '../constants/materialParameterNames';
import { GeometryParameterNames } from '../constants/geometryParameterNames';
import styles from './MainForm.module.css';

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
	function handleSubmit(e: any) {
		// Prevent the browser from reloading the page
		e.preventDefault();

		// Read the form data
		const form = e.target;
		const formData = new FormData(form);

		// You can pass formData as a fetch body directly:
		// fetch('/some-api', { method: form.method, body: formData });

		// Or you can work with it as a plain object:
		const formJson = Object.fromEntries(formData.entries());
		console.log(formJson);
	}

	return (
		<form method="post" onSubmit={handleSubmit} onReset={onReset}>
			<div className="row">
				<div className="col">
					{Object.values(GeometryParameterNames).map((key) => {
						if (
							geometryParameters[chosenGeometry][key] !==
							undefined
						) {
							if (key !== GeometryParameterNames.picture) {
								return (
									<TextInput
										key={key}
										name={key}
										label={
											geometryParameters[chosenGeometry][
												key
											]
										}
										defaultValue="100"
										unit="nm"
									/>
								);
							}
						}
					})}
				</div>
				<div className="col">
					<img
						className={styles.img}
						src={
							geometryParameters[chosenGeometry][
								GeometryParameterNames.picture
							]
						}
						alt={chosenGeometry}
					/>
				</div>

				<div className="col">
					{Object.values(MaterialParameterNames).map((key) => {
						if (
							materialParameters[chosenMaterial][key] !==
							undefined
						) {
							if (key === MaterialParameterNames.kuAxis) {
								return (
									<RadioInput
										key={key}
										name={inputMaterialLoopParams[key].name}
										label={
											inputMaterialLoopParams[key].label
										}
										defaultValue={materialParameters[
											chosenMaterial
										][key].toString()}
									/>
								);
							}
							return (
								<TextInput
									key={key}
									name={inputMaterialLoopParams[key].name}
									label={inputMaterialLoopParams[key].label}
									defaultValue={materialParameters[
										chosenMaterial
									][key].toString()}
									unit={inputMaterialLoopParams[key].unit}
								/>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
			<button type="reset">Reset form</button>
			<button type="submit">Submit form</button>
		</form>
	);
}
