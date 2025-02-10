import { MaterialParameterNames } from '../constants/materialTypes';
import styles from './styles/TextInput.module.css';

interface TextInputProps {
	name: string;
	label: string;
	optional: boolean;
	defaultValue: string;
	unit: string;
}

export default function TextInput({
	name,
	label,
	optional,
	defaultValue,
	unit,
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
				pattern={
					name === MaterialParameterNames.Ms ||
					name === MaterialParameterNames.alpha
						? '[\\+\\-]?([1-9]\\d*)(\\.\\d+)?([eE][\\+\\-]?\\d+)?'
						: '[\\+\\-]?(\\d+)(\\.\\d+)?([eE][\\+\\-]?\\d+)?'
				}
				placeholder="e.g., 2.6e-12"
				title={
					'Please enter a valid' +
					(name === MaterialParameterNames.Ms ||
					name === MaterialParameterNames.alpha
						? ' nonzero'
						: '') +
					' decimal number or scientific notation (e.g., 84, 3.4, -2.56, or 1.2e-10).'
				}
			/>{' '}
			{unit}
		</p>
	);
}
