import monolayerLineTrace from '../assets/monolayerLineTrace.png';
import waveguideCrossSection from '../assets/waveguideCrossSection.png';
import wireCrossSection from '../assets/wireCrossSection.png';
import { MaterialType, PatternProperties } from './materialTypes';
import {
	DefaultValuesForYIG,
	DefaultValuesForGaYIG,
	DefaultValuesForPy,
} from './materialTypes';

export enum GeometryType {
	Waveguide = 'Waveguide',
	PlaneFilm = 'Plane Film',
	Wire = 'Wire',
}

enum DefaultValuesForWaveguide {
	width = 300,
	thickness = 100,
}

enum DefaultValuesForPlaneFilm {
	thickness = 100,
}

enum DefaultValuesForWire {
	radius = 100,
}

interface GeometryPropertyPatterns {
	thickness: PatternProperties;
	dx: PatternProperties;
}

const PropertyPatterns: GeometryPropertyPatterns = {
	thickness: {
		pattern: '^(?:[2-9]\\d*|1\\d+)(?:\\.\\d+)?$|^1\\.(?:0*[1-9]\\d*)$',
		title: 'Please enter a number greater than 1 (e.g., 1.5, 100).',
	},
	dx: {
		pattern: '^[+\\-]?(?!(?:0+)(?:\\.0+)?$)(?:\\d+|\\d*\\.\\d+)$',
		title: 'Please enter a valid nonzero decimal number (e.g., 5, 3.4, -2.56).',
	},
};

interface Property {
	name: string;
	label: string;
	required: boolean;
	unit: string;
	defaultValue?: Record<MaterialType, number> | number;
	placeholder?: string;
	pattern?: PatternProperties;
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
			defaultValue: DefaultValuesForWaveguide.width,
			placeholder: 'e.g., ' + DefaultValuesForWaveguide.width.toString(),
			pattern: PropertyPatterns.thickness,
		},
		thickness: {
			name: 'thickness',
			required: true,
			label: 'Thickness (b): ',
			unit: ' nm',
			defaultValue: DefaultValuesForWaveguide.thickness,
			placeholder:
				'e.g., ' + DefaultValuesForWaveguide.thickness.toString(),
			pattern: PropertyPatterns.thickness,
		},
		dx: {
			name: 'dWidth',
			required: false,
			label: 'dx: ',
			unit: ' nm',
			defaultValue: {
				[MaterialType.YIG]: DefaultValuesForYIG.dx,
				[MaterialType.GaYIG]: DefaultValuesForGaYIG.dx,
				[MaterialType.Py]: DefaultValuesForPy.dx,
				[MaterialType.Custom]: DefaultValuesForYIG.dx,
			},
			placeholder: 'e.g., ' + DefaultValuesForYIG.dx.toString(),
			pattern: PropertyPatterns.dx,
		},
		dy: {
			name: 'dThick',
			required: false,
			label: 'dy: ',
			unit: ' nm',
			defaultValue: {
				[MaterialType.YIG]: DefaultValuesForYIG.dx,
				[MaterialType.GaYIG]: DefaultValuesForGaYIG.dx,
				[MaterialType.Py]: DefaultValuesForPy.dx,
				[MaterialType.Custom]: DefaultValuesForYIG.dx,
			},
			placeholder: 'e.g., ' + DefaultValuesForYIG.dx.toString(),
			pattern: PropertyPatterns.dx,
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
			defaultValue: DefaultValuesForPlaneFilm.thickness,
			placeholder:
				'e.g., ' + DefaultValuesForPlaneFilm.thickness.toString(),
			pattern: PropertyPatterns.thickness,
		},
		dx: {
			name: 'dThick',
			required: false,
			label: 'dy: ',
			unit: ' nm',
			defaultValue: {
				[MaterialType.YIG]: DefaultValuesForYIG.dx,
				[MaterialType.GaYIG]: DefaultValuesForGaYIG.dx,
				[MaterialType.Py]: DefaultValuesForPy.dx,
				[MaterialType.Custom]: DefaultValuesForYIG.dx,
			},
			placeholder: 'e.g., ' + DefaultValuesForYIG.dx.toString(),
			pattern: PropertyPatterns.dx,
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
			defaultValue: DefaultValuesForWire.radius,
			placeholder: 'e.g., ' + DefaultValuesForWire.radius.toString(),
			pattern: PropertyPatterns.thickness,
		},
		dr: {
			name: 'dRadius',
			required: false,
			label: 'dr: ',
			unit: ' nm',
			defaultValue: {
				[MaterialType.YIG]: DefaultValuesForYIG.dx,
				[MaterialType.GaYIG]: DefaultValuesForGaYIG.dx,
				[MaterialType.Py]: DefaultValuesForPy.dx,
				[MaterialType.Custom]: DefaultValuesForYIG.dx,
			},
			placeholder: 'e.g., ' + DefaultValuesForYIG.dx.toString(),
			pattern: PropertyPatterns.dx,
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
