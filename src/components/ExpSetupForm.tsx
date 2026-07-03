import {
	ExperimentType,
	experimentParameters,
} from '../constants/experimentTypes';
import TextInput from './TextInput';
import RadioInput from './RadioInput';

interface ExpSetupFormProps {
	chosenExperiment: ExperimentType;
	showAdvanced: boolean;
}

export default function ExpSetupForm({
	chosenExperiment,
	showAdvanced,
}: ExpSetupFormProps) {
	return (
		<div>
			{Object.values(experimentParameters[chosenExperiment].parameters)
				.filter((parameter) => parameter.required || showAdvanced)
				.map((parameter) =>
					parameter.radio ? (
						<RadioInput
							key={parameter.name}
							name={parameter.name}
							label={parameter.label}
							defaultValue={parameter.defaultValue.toString()}
						/>
					) : (
						<TextInput
							key={parameter.name}
							name={parameter.name}
							label={parameter.label}
							optional={!parameter.required}
							defaultValue={parameter.defaultValue.toString()}
							unit={parameter.unit}
							placeholder={parameter.placeholder}
							pattern={parameter.pattern}
						/>
					)
				)}
		</div>
	);
}
