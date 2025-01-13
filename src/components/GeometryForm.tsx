import { GeometryType, geometryParameters } from '../constants/geometryTypes';
import TextInput from './TextInput';
import styles from './GeometryForm.module.css';

interface GeometryFormProps {
	chosenGeometry: GeometryType;
}

export default function GeometryForm({ chosenGeometry }: GeometryFormProps) {
	return (
		<div className="d-grid" style={{ gridTemplateRows: '150px auto' }}>
			<img
				className={styles.img}
				src={geometryParameters[chosenGeometry].picture.file}
				alt={chosenGeometry}
			/>
			<div className="mt-3">
				{Object.values(
					geometryParameters[chosenGeometry].properties
				).map((property) => {
					if (property.required) {
						return (
							<TextInput
								key={property.name}
								name={property.name}
								label={property.label}
								unit={property.unit}
								defaultValue={property.defaultValue.toString()}
							/>
						);
					}
				})}
			</div>
		</div>
	);
}
