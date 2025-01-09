import { Geometries, geometryParameters } from '../constants/geometryTypes';
import { GeometryParameterNames } from '../constants/geometryParameterNames';
import styles from './ExpSetupForm.module.css';

interface ExpSetupFormProps {
	chosenGeometry: Geometries;
}

export default function ExpSetupForm({ chosenGeometry }: ExpSetupFormProps) {
	return (
		<img
			className={styles.img}
			src={
				geometryParameters[chosenGeometry][
					GeometryParameterNames.picture
				]
			}
			alt={chosenGeometry}
		/>
	);
}
