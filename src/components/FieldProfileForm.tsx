import {
	fieldProfileParameters,
	FieldProfileParameterNames,
	FieldNames,
} from '../constants/fieldFetchingTypes';
import availableFieldNames from '../constants/fieldFetchingTypes';
import RadioInput from './RadioInput';
import Select from './Select';
import { Button } from '@mui/material';

interface FieldProfileFormProps {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	loading: boolean;
	setChosenFieldName: (fieldName: FieldNames) => void;
	chosenFieldName: string;
}

export default function FieldProfileForm({
	onSubmit,
	loading,
	chosenFieldName,
	setChosenFieldName,
}: FieldProfileFormProps) {
	const fieldNameParam =
		fieldProfileParameters[FieldProfileParameterNames.fieldName];
	const componentParam =
		fieldProfileParameters[FieldProfileParameterNames.component];
	return (
		<form method="post" onSubmit={onSubmit}>
			<div>
				<Select
					name={fieldNameParam.name}
					label={fieldNameParam.label}
					defaultValue={chosenFieldName}
					allOptions={availableFieldNames}
					setChosenOption={setChosenFieldName}
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
					{'Get field profile'}
				</Button>
			</div>
		</form>
	);
}
