import {
	materials,
	MaterialType,
	MaterialParameterNames,
} from '../constants/materialTypes';
import RadioInput from './RadioInput';
import TextInput from './TextInput';

interface MaterialFormProps {
	chosenMaterial: MaterialType;
}

export default function MaterialForm({ chosenMaterial }: MaterialFormProps) {
	return (
		<div>
			{Object.values(materials[chosenMaterial].parameters).map((key) => {
				if (key.name === MaterialParameterNames.Ku_a) {
					return (
						<RadioInput
							key={key.name}
							name={key.name}
							label={key.label}
							defaultValue={key.defaultValue.toString()}
						/>
					);
				}
				return (
					<TextInput
						key={key.name}
						name={key.name}
						label={key.label}
						optional={false}
						defaultValue={key.defaultValue.toString()}
						unit={key.unit}
						placeholder={key.placeholder}
					/>
				);
			})}
		</div>
	);
}
