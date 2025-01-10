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
				label={'External field strength: '}
				defaultValue="200"
				unit="mT"
			/>
			<RadioInput
				key={'fieldAxis'}
				name={'fieldAxis'}
				label={'External field axis: '}
				defaultValue={'x'}
			/>
			<TextInput
				key={'kMin'}
				name={'kMin'}
				label={'Lowest 𝑘: '}
				defaultValue="0"
				unit="rad/μm"
			/>
			<TextInput
				key={'kMax'}
				name={'kMax'}
				label={'Highest 𝑘: '}
				defaultValue="20"
				unit="rad/μm"
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
