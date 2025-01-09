import { Geometries, geometryParameters } from '../constants/geometryTypes';
import { GeometryParameterNames } from '../constants/geometryParameterNames';
import styles from './ExpSetupForm.module.css';
import TextInput from './TextInput';
import RadioInput from './RadioInput';

interface ExpSetupFormProps {
	chosenGeometry: Geometries;
}

export default function ExpSetupForm({ chosenGeometry }: ExpSetupFormProps) {
	return (
		<div>
			<img
				className={styles.img}
				src={
					geometryParameters[chosenGeometry][
						GeometryParameterNames.picture
					]
				}
				alt={chosenGeometry}
			/>
			<TextInput
				key={'extField'}
				name={'extField'}
				label={'External Field strength: '}
				defaultValue="200"
				unit="mT"
			/>
			<RadioInput
				key={'fieldAxis'}
				name={'fieldAxis'}
				label={'Field Axis: '}
				defaultValue={'x'}
			/>
		</div>
	);
}
