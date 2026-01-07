import { MaterialParameterNames } from '../constants/materialTypes';
import styles from './styles/TextInput.module.css';

interface TextInputProps {
	name: string;
	label: string;
	optional: boolean;
	defaultValue: string;
	unit: string;
	placeholder?: string;
	pattern?: string;
}

export default function TextInput({
	name,
	label,
	optional,
	defaultValue,
	unit,
	placeholder,
	pattern,
}: TextInputProps) {
	return (
		<p className={optional ? styles.labelOptional : styles.labelMain}>
			{label}{' '}
			<input
				required={true}
				name={name}
				defaultValue={defaultValue || ''}
				key={`${name}-${defaultValue}`}
				className={optional ? styles.inputOptional : styles.inputMain}
				inputMode="decimal"
				pattern={pattern}
				placeholder={placeholder || 'e.g., 84, 3.4, -2.56'}
				title={
					'Please enter a valid' +
					(name === MaterialParameterNames.Ms ||
					name === MaterialParameterNames.alpha
						? ' nonzero'
						: '') +
					' decimal number (e.g., 84, 3.4, -2.56).'
				}
			/>{' '}
			{unit}
		</p>
	);
}
