import { inputMaterialLoopParams } from '../constants/inputMaterialLoopParams';
import styles from './TextInput.module.css';

interface TextInputProps {
	name: string;
	label: string;
	defaultValue: string;
	unit: string;
}

export default function TextInput({
	name,
	label,
	defaultValue,
	unit,
}: TextInputProps) {
	return (
		<p>
			<label className={styles.label}></label>
			{label}{' '}
			<input
				required={true}
				name={name}
				defaultValue={defaultValue || ''}
				key={`${name}-${defaultValue}`}
				className={styles.input}
				inputMode="decimal"
				pattern={
					name === inputMaterialLoopParams.ms.name
						? '[+-]?(?:[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?'
						: '[+-]?(?:0|[1-9]\\d*)(?:\\.\\d+)?(?:[eE][+-]?\\d+)?'
				}
				placeholder="e.g., 2.6e-12"
				title={
					'Please enter a valid' +
					(name === inputMaterialLoopParams.ms.name
						? ' nonzero'
						: '') +
					' decimal number or scientific notation (e.g., 84, 3.4, -2.56, or 1.2e-10).'
				}
			/>{' '}
			{unit}
		</p>
	);
}
