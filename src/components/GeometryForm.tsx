import { GeometryType, geometryParameters } from '../constants/geometryTypes';
import { MaterialType } from '../constants/materialTypes';
import TextInput from './TextInput';
import styles from './GeometryForm.module.css';

interface GeometryFormProps {
	chosenMaterial: MaterialType;
	chosenGeometry: GeometryType;
	showAdvanced: boolean;
}

export default function GeometryForm({
	chosenMaterial,
	chosenGeometry,
	showAdvanced,
}: GeometryFormProps) {
	return (
		<div>
			{'Geometry cross-section:'}
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
						if (property.required || showAdvanced) {
							return (
								<TextInput
									key={property.name}
									name={property.name}
									label={property.label}
									unit={property.unit}
									optional={!property.required}
									defaultValue={
										property.required
											? property.defaultValue
											: property.defaultValue[
													chosenMaterial
											  ]
									}
								/>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
}
