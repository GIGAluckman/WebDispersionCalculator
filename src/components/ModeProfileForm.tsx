import {
	modeProfileParameters,
	ModeProfileParameterNames,
} from '../constants/modeFetchingTypes';
import RadioInput from './RadioInput';
import TextInput from './TextInput';
import { Button } from '@mui/material';

interface ModeProfileFormProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	loading: boolean;
	maxModeNumber: number;
}

export default function ModeProfileForm({
	onSubmit,
	loading,
	maxModeNumber,
}: ModeProfileFormProps) {
	const modeNumberParam =
		modeProfileParameters[ModeProfileParameterNames.modeNumber];
	const componentParam =
		modeProfileParameters[ModeProfileParameterNames.component];
	const wavevectorParam =
		modeProfileParameters[ModeProfileParameterNames.wavevector];
	return (
		<form method="post" onSubmit={onSubmit}>
			<div>
				<TextInput
					name={modeNumberParam.name}
					label={modeNumberParam.label}
					optional={false}
					defaultValue={modeNumberParam.defaultValue}
					placeholder={modeNumberParam.placeholder}
					pattern={{
						pattern: `^[0-${maxModeNumber - 1}]$`,
						title: `Please enter a valid mode number between 0 and ${maxModeNumber - 1}.`,
					}}
					unit={modeNumberParam.unit}
				/>
				<TextInput
					name={wavevectorParam.name}
					label={wavevectorParam.label}
					optional={false}
					defaultValue={wavevectorParam.defaultValue}
					placeholder={wavevectorParam.placeholder}
					pattern={wavevectorParam.pattern}
					unit={wavevectorParam.unit}
				/>
				<RadioInput
					name={componentParam.name}
					label={componentParam.label}
					defaultValue={componentParam.defaultValue}
				/>
			</div>
			<div className="d-flex justify-content-start p-2">
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={loading}
				>
					{'Get mode profile'}
				</Button>
			</div>
		</form>
	);
}
