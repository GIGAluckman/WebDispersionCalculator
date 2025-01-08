import { AxisNames } from '../constants/axisNames';
import styles from './RadioInput.module.css';

interface RadioInputProps {
	name: string;
	label: string;
	defaultValue: string;
}

export default function RadioInput({
	name,
	label,
	defaultValue,
}: RadioInputProps) {
	const availableAxisNames = Object.values(AxisNames);
	return (
		<>
			<p className={styles.radiocontainer}>
				{label}{' '}
				{availableAxisNames.map((key) => {
					return (
						<label key={`label-${key}`} className={styles.label}>
							<input
								type="radio"
								name={name}
								value={key}
								defaultChecked={defaultValue === key}
								key={`${name}-${key}-${defaultValue}`}
								className={styles.radioInput}
							/>{' '}
							{key}
						</label>
					);
				})}
			</p>
		</>
	);
}
