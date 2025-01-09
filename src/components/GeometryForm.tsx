import { GeometryParameterNames } from '../constants/geometryParameterNames';
import { Geometries } from '../constants/geometryTypes';
import { geometryParameters } from '../constants/geometryTypes';
import TextInput from './TextInput';

interface GeometryFormProps {
	chosenGeometry: Geometries;
}

export default function GeometryForm({ chosenGeometry }: GeometryFormProps) {
	return (
		<div>
			{Object.values(GeometryParameterNames).map((key) => {
				if (geometryParameters[chosenGeometry][key] !== undefined) {
					if (key !== GeometryParameterNames.picture) {
						return (
							<TextInput
								key={key}
								name={key}
								label={geometryParameters[chosenGeometry][key]}
								defaultValue="100"
								unit="nm"
							/>
						);
					}
				}
			})}
		</div>
	);
}
