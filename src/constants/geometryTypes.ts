import monolayerLineTrace from '../assets/monolayerLineTrace.png';
import waveguideCrossSection from '../assets/waveguideCrossSection.png';
import wireCrossSection from '../assets/wireCrossSection.png';
import { GeometryParameterNames } from './geometryParameterNames';

export enum Geometries {
	Waveguide = 'Waveguide',
	PlaneFilm = 'Plane Film',
	Wire = 'Wire',
}

export const geometryParameters: Record<
	Geometries,
	Partial<Record<GeometryParameterNames, string>>
> = {
	[Geometries.Waveguide]: {
		[GeometryParameterNames.width]: 'Width: ',
		[GeometryParameterNames.thickness]: 'Thickness: ',
		[GeometryParameterNames.picture]: waveguideCrossSection,
	},
	[Geometries.PlaneFilm]: {
		[GeometryParameterNames.thickness]: 'Thickness: ',
		[GeometryParameterNames.picture]: monolayerLineTrace,
	},
	[Geometries.Wire]: {
		[GeometryParameterNames.radius]: 'Radius: ',
		[GeometryParameterNames.picture]: wireCrossSection,
	},
};

Object.keys(geometryParameters[Geometries.Waveguide]).map((key) => {
	console.log(key);
});

const availableGeometries = Object.values(Geometries);

export default availableGeometries;
