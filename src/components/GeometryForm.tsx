import { GeometryParameterNames } from '../constants/geometryParameterNames';
import { Geometries } from '../constants/geometryTypes';
import { geometryParameters } from '../constants/geometryTypes';
import TextInput from './TextInput';
import styles from './GeometryForm.module.css';

interface GeometryFormProps {
	chosenGeometry: Geometries;
}

export default function GeometryForm({ chosenGeometry }: GeometryFormProps) {
	return (
		<div className="d-grid" style={{ gridTemplateRows: '150px auto' }}>
			<img
				className={styles.img}
				src={
					geometryParameters[chosenGeometry][
						GeometryParameterNames.picture
					]
				}
				alt={chosenGeometry}
			/>
			<div className="mt-3">
				{Object.values(GeometryParameterNames).map((key) => {
					if (geometryParameters[chosenGeometry][key] !== undefined) {
						if (key !== GeometryParameterNames.picture) {
							return (
								<TextInput
									key={key}
									name={key}
									label={
										geometryParameters[chosenGeometry][key]
									}
									defaultValue="100"
									unit="nm"
								/>
							);
						}
					}
				})}
			</div>
		</div>
	);
}
