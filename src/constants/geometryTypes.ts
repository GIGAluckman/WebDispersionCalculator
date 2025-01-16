import monolayerLineTrace from '../assets/monolayerLineTrace.png';
import waveguideCrossSection from '../assets/waveguideCrossSection.png';
import wireCrossSection from '../assets/wireCrossSection.png';
import { MaterialType } from './materialTypes';

export enum GeometryType {
	Waveguide = 'Waveguide',
	PlaneFilm = 'Plane Film',
	Wire = 'Wire',
}

interface Property {
	name: string;
	label: string;
	required: boolean;
	unit: string;
	defaultValue?: Record<MaterialType, number> | number;
}

interface Picture {
	file: string;
}

interface WaveguideProperties {
	thickness: Property;
	width: Property;
	dx: Property;
	dy: Property;
}

interface ThinFilmProperties {
	thickness: Property;
	dx: Property;
}

interface WireProperties {
	radius: Property;
	dr: Property;
}

interface Geometry<T> {
	type: GeometryType;
	properties: T;
	picture: Picture;
}

const waveguide: Geometry<WaveguideProperties> = {
	type: GeometryType.Waveguide,
	properties: {
		width: {
			name: 'width',
			required: true,
			label: 'Width (a): ',
			unit: ' nm',
			defaultValue: 300,
		},
		thickness: {
			name: 'thickness',
			required: true,
			label: 'Thickness (b): ',
			unit: ' nm',
			defaultValue: 100,
		},
		dx: {
			name: 'dWidth',
			required: false,
			label: 'dx: ',
			unit: ' nm',
			defaultValue: {
				[MaterialType.YIG]: 10,
				[MaterialType.GaYIG]: 10,
				[MaterialType.Py]: 5,
				[MaterialType.Custom]: 10,
			},
		},
		dy: {
			name: 'dThick',
			required: false,
			label: 'dy: ',
			unit: ' nm',
			defaultValue: {
				[MaterialType.YIG]: 10,
				[MaterialType.GaYIG]: 10,
				[MaterialType.Py]: 5,
				[MaterialType.Custom]: 10,
			},
		},
	},
	picture: {
		file: waveguideCrossSection,
	},
};

const thinFilm: Geometry<ThinFilmProperties> = {
	type: GeometryType.PlaneFilm,
	properties: {
		thickness: {
			name: 'thickness',
			required: true,
			label: 'Thickness: ',
			unit: ' nm',
			defaultValue: 100,
		},
		dx: {
			name: 'dThick',
			required: false,
			label: 'dy: ',
			unit: ' nm',
			defaultValue: {
				[MaterialType.YIG]: 10,
				[MaterialType.GaYIG]: 10,
				[MaterialType.Py]: 5,
				[MaterialType.Custom]: 10,
			},
		},
	},
	picture: {
		file: monolayerLineTrace,
	},
};

const wire: Geometry<WireProperties> = {
	type: GeometryType.Wire,
	properties: {
		radius: {
			name: 'radius',
			required: true,
			label: 'Radius: ',
			unit: ' nm',
			defaultValue: 100,
		},
		dr: {
			name: 'dRadius',
			required: false,
			label: 'dr: ',
			unit: ' nm',
			defaultValue: {
				[MaterialType.YIG]: 10,
				[MaterialType.GaYIG]: 10,
				[MaterialType.Py]: 5,
				[MaterialType.Custom]: 10,
			},
		},
	},
	picture: {
		file: wireCrossSection,
	},
};

type AllGeometries =
	| Geometry<WaveguideProperties>
	| Geometry<ThinFilmProperties>
	| Geometry<WireProperties>;

export const geometryParameters: Record<GeometryType, AllGeometries> = {
	[GeometryType.Waveguide]: waveguide,
	[GeometryType.PlaneFilm]: thinFilm,
	[GeometryType.Wire]: wire,
};

const availableGeometries = Object.values(GeometryType);

export default availableGeometries;
