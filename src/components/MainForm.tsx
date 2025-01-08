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
					<div className="row">
						<div className="col">
							{Object.values(GeometryParameterNames).map(
								(key) => {
									if (
										geometryParameters[chosenGeometry][
											key
										] !== undefined
									) {
										if (
											key !==
											GeometryParameterNames.picture
										) {
											return (
												<TextInput
													key={key}
													name={key}
													label={
														geometryParameters[
															chosenGeometry
														][key]
													}
													defaultValue="100"
													unit="nm"
												/>
											);
										}
									}
								}
							)}
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
					</div>
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
