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
				name={name}
				defaultValue={defaultValue || ''}
				key={`${name}-${defaultValue}`}
				className={styles.input}
			/>{' '}
			{unit}
			{/* <hr /> */}
		</p>
	);
}
