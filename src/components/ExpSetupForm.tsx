import {
	ExperimentType,
	experimentParameters,
} from '../constants/experimentTypes';
import TextInput from './TextInput';
import RadioInput from './RadioInput';

interface ExpSetupFormProps {
	chosenExperiment: ExperimentType;
}

export default function ExpSetupForm({ chosenExperiment }: ExpSetupFormProps) {
	return (
		<div>
			{Object.values(
				experimentParameters[chosenExperiment].parameters
			).map((parameter) => {
				if (parameter.required) {
					if (parameter.radio) {
						return (
							<RadioInput
								key={parameter.name}
								name={parameter.name}
								label={parameter.label}
								defaultValue={parameter.defaultValue.toString()}
							/>
						);
					}
					return (
						<TextInput
							key={parameter.name}
							name={parameter.name}
							label={parameter.label}
							defaultValue={parameter.defaultValue.toString()}
							unit={parameter.unit}
						/>
					);
				}
			})}
		</div>
	);
}
