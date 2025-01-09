import { MaterialParameterNames } from '../constants/materialParameterNames';
import { materialParameters, Materials } from '../constants/materialTypes';
import RadioInput from './RadioInput';
import TextInput from './TextInput';
import { inputMaterialLoopParams } from '../constants/inputMaterialLoopParams';

interface MaterialFormProps {
	chosenMaterial: Materials;
}

export default function MaterialForm({ chosenMaterial }: MaterialFormProps) {
	return (
		<div>
			{Object.values(MaterialParameterNames).map((key) => {
				if (materialParameters[chosenMaterial][key] !== undefined) {
					if (key === MaterialParameterNames.kuAxis) {
						return (
							<RadioInput
								key={key}
								name={inputMaterialLoopParams[key].name}
								label={inputMaterialLoopParams[key].label}
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
							defaultValue={materialParameters[chosenMaterial][
								key
							].toString()}
							unit={inputMaterialLoopParams[key].unit}
						/>
					);
				} else {
					return null;
				}
			})}
		</div>
	);
}
