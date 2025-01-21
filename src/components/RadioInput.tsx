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
			<div className={styles.radioContainer}>
				{label}{' '}
				{availableAxisNames.map((key) => {
					return (
						<div className="form-check form-check-inline" key={key}>
							<input
								type="radio"
								name={name}
								value={key}
								defaultChecked={defaultValue === key}
								key={`${name}-${key}-${defaultValue}`}
								className={'form-check-input'}
							/>{' '}
							<label
								key={`label-${key}-${name}`}
								className={'form-check-label'}
							>
								{key}
							</label>
						</div>
					);
				})}
			</div>
		</>
	);
}
