import { PatternProperties } from '../constants/materialTypes';
import styles from './styles/TextInput.module.css';

interface TextInputProps {
	name: string;
	label: string;
	optional: boolean;
	defaultValue: string;
	unit: string;
	placeholder?: string;
	pattern?: PatternProperties;
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
				pattern={pattern?.pattern}
				placeholder={placeholder || 'e.g., 84, 3.4, -2.56'}
				title={pattern?.title}
			/>{' '}
			{unit}
		</p>
	);
}
