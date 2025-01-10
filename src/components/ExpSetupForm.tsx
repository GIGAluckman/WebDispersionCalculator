import { Experiment } from '../constants/experimentTypes';
import TextInput from './TextInput';
import RadioInput from './RadioInput';

interface ExpSetupFormProps {
	chosenExperiment: Experiment;
}

export default function ExpSetupForm({ chosenExperiment }: ExpSetupFormProps) {
	return (
		<div>
			<TextInput
				key={'extField'}
				name={'extField'}
				label={'External Field strength: '}
				defaultValue="200"
				unit="mT"
			/>
			<RadioInput
				key={'fieldAxis'}
				name={'fieldAxis'}
				label={'Field Axis: '}
				defaultValue={'x'}
			/>
			<TextInput
				key={'kMin'}
				name={'kMin'}
				label={'Lowest k: '}
				defaultValue="0"
				unit="rad/um"
			/>
			<TextInput
				key={'kMax'}
				name={'kMax'}
				label={'Highest k: '}
				defaultValue="20"
				unit="rad/um"
			/>
			<TextInput
				key={'nModes'}
				name={'nModes'}
				label={'Number of modes: '}
				defaultValue="3"
				unit=""
			/>
		</div>
	);
}
