import { AxisNames } from './axisNames';

export enum MaterialParameterNames {
	Ms = 'saturationMagnetization',
	A = 'exchangeStiffness',
	Ku = 'anisotropyConstant',
	Ku_a = 'anisotropyAxis',
	alpha = 'GilbertDamping',
}

export enum MaterialType {
	YIG = 'YIG',
	GaYIG = 'GaYIG',
	Py = 'Py',
	Custom = 'Custom',
}

enum MaterialParameterLabels {
	Ms = 'Saturation magnetization: ',
	A = 'Exchange constant: ',
	Ku = 'Uniaxial anisotropy: ',
	Ku_a = 'Uniaxial anisotropy axis: ',
	alpha = 'Gilbert damping: ',
}

enum MaterialParameterPatterns {
	Ms = '^[+\\-]?(?!(?:0+)(?:\\.0+)?$)(?:\\d+|\\d*\\.\\d+)$',
	A = '[\\+\\-]?(\\d+)(\\.\\d+)?',
	Ku = '[\\+\\-]?(\\d+)(\\.\\d+)?',
	alpha = '^[+\\-]?(?!(?:0+)(?:\\.0+)?$)(?:\\d+|\\d*\\.\\d+)$',
}

enum MaterialParameterUnits {
	Ms = 'A/m',
	A = 'pJ/m',
	Ku = 'J/m³',
	Ku_a = '',
	alpha = '',
}

export enum DefaultValuesForYIG {
	Ms = 140000,
	A = 3.4,
	Ku = 0,
	alpha = 0.0002,
	dx = 10,
}

export enum DefaultValuesForGaYIG {
	Ms = 21724.65,
	A = 1.37,
	Ku = 857.04,
	alpha = 0.0007,
	dx = 30,
}

export enum DefaultValuesForPy {
	Ms = 800000,
	A = 13,
	Ku = 0,
	alpha = 0.01,
	dx = 5,
}

export interface MaterialParameter {
	name: string;
	label: string;
	unit: string;
	defaultValue: number | AxisNames;
	placeholder?: string;
	pattern?: string;
}

interface Material {
	type: MaterialType;
	parameters: Record<string, MaterialParameter>;
}

const YIG: Material = {
	type: MaterialType.YIG,
	parameters: {
		[MaterialParameterNames.Ms]: {
			name: MaterialParameterNames.Ms,
			label: MaterialParameterLabels.Ms,
			unit: MaterialParameterUnits.Ms,
			placeholder: 'e.g., ' + DefaultValuesForYIG.Ms.toString(),
			defaultValue: DefaultValuesForYIG.Ms,
			pattern: MaterialParameterPatterns.Ms,
		},
		[MaterialParameterNames.A]: {
			name: MaterialParameterNames.A,
			label: MaterialParameterLabels.A,
			unit: MaterialParameterUnits.A,
			placeholder: 'e.g., ' + DefaultValuesForYIG.A.toString(),
			defaultValue: DefaultValuesForYIG.A,
			pattern: MaterialParameterPatterns.A,
		},
		[MaterialParameterNames.Ku]: {
			name: MaterialParameterNames.Ku,
			label: MaterialParameterLabels.Ku,
			unit: MaterialParameterUnits.Ku,
			placeholder: 'e.g., ' + DefaultValuesForYIG.Ku.toString(),
			defaultValue: DefaultValuesForYIG.Ku,
			pattern: MaterialParameterPatterns.Ku,
		},
		[MaterialParameterNames.Ku_a]: {
			name: MaterialParameterNames.Ku_a,
			label: MaterialParameterLabels.Ku_a,
			unit: '',
			defaultValue: AxisNames.x,
		},
		[MaterialParameterNames.alpha]: {
			name: MaterialParameterNames.alpha,
			label: MaterialParameterLabels.alpha,
			unit: MaterialParameterUnits.alpha,
			placeholder: 'e.g., ' + DefaultValuesForYIG.alpha.toString(),
			defaultValue: DefaultValuesForYIG.alpha,
			pattern: MaterialParameterPatterns.alpha,
		},
	},
};

const GaYIG: Material = {
	type: MaterialType.GaYIG,
	parameters: {
		[MaterialParameterNames.Ms]: {
			name: MaterialParameterNames.Ms,
			label: MaterialParameterLabels.Ms,
			unit: MaterialParameterUnits.Ms,
			placeholder: 'e.g., ' + DefaultValuesForGaYIG.Ms.toString(),
			defaultValue: DefaultValuesForGaYIG.Ms,
			pattern: MaterialParameterPatterns.Ms,
		},
		[MaterialParameterNames.A]: {
			name: MaterialParameterNames.A,
			label: MaterialParameterLabels.A,
			unit: MaterialParameterUnits.A,
			placeholder: 'e.g., ' + DefaultValuesForGaYIG.A.toString(),
			defaultValue: DefaultValuesForGaYIG.A,
			pattern: MaterialParameterPatterns.A,
		},
		[MaterialParameterNames.Ku]: {
			name: MaterialParameterNames.Ku,
			label: MaterialParameterLabels.Ku,
			unit: MaterialParameterUnits.Ku,
			placeholder: 'e.g., ' + DefaultValuesForGaYIG.Ku.toString(),
			defaultValue: DefaultValuesForGaYIG.Ku,
			pattern: MaterialParameterPatterns.Ku,
		},
		[MaterialParameterNames.Ku_a]: {
			name: MaterialParameterNames.Ku_a,
			label: MaterialParameterLabels.Ku_a,
			unit: '',
			defaultValue: AxisNames.y,
		},
		[MaterialParameterNames.alpha]: {
			name: MaterialParameterNames.alpha,
			label: MaterialParameterLabels.alpha,
			unit: MaterialParameterUnits.alpha,
			placeholder: 'e.g., ' + DefaultValuesForGaYIG.alpha.toString(),
			defaultValue: DefaultValuesForGaYIG.alpha,
			pattern: MaterialParameterPatterns.alpha,
		},
	},
};

const Py: Material = {
	type: MaterialType.Py,
	parameters: {
		[MaterialParameterNames.Ms]: {
			name: MaterialParameterNames.Ms,
			label: MaterialParameterLabels.Ms,
			unit: MaterialParameterUnits.Ms,
			placeholder: 'e.g., ' + DefaultValuesForPy.Ms.toString(),
			defaultValue: DefaultValuesForPy.Ms,
			pattern: MaterialParameterPatterns.Ms,
		},
		[MaterialParameterNames.A]: {
			name: MaterialParameterNames.A,
			label: MaterialParameterLabels.A,
			unit: MaterialParameterUnits.A,
			placeholder: 'e.g., ' + DefaultValuesForPy.A.toString(),
			defaultValue: DefaultValuesForPy.A,
			pattern: MaterialParameterPatterns.A,
		},
		[MaterialParameterNames.Ku]: {
			name: MaterialParameterNames.Ku,
			label: MaterialParameterLabels.Ku,
			unit: MaterialParameterUnits.Ku,
			placeholder: 'e.g., ' + DefaultValuesForPy.Ku.toString(),
			defaultValue: DefaultValuesForPy.Ku,
			pattern: MaterialParameterPatterns.Ku,
		},
		[MaterialParameterNames.Ku_a]: {
			name: MaterialParameterNames.Ku_a,
			label: MaterialParameterLabels.Ku_a,
			unit: '',
			defaultValue: AxisNames.x,
		},
		[MaterialParameterNames.alpha]: {
			name: MaterialParameterNames.alpha,
			label: MaterialParameterLabels.alpha,
			unit: MaterialParameterUnits.alpha,
			placeholder: 'e.g., ' + DefaultValuesForPy.alpha.toString(),
			defaultValue: DefaultValuesForPy.alpha,
			pattern: MaterialParameterPatterns.alpha,
		},
	},
};

const Custom: Material = {
	type: MaterialType.Custom,
	parameters: {
		[MaterialParameterNames.Ms]: {
			name: MaterialParameterNames.Ms,
			label: MaterialParameterLabels.Ms,
			unit: MaterialParameterUnits.Ms,
			placeholder: 'e.g., ' + DefaultValuesForYIG.Ms.toString(),
			defaultValue: 0,
			pattern: MaterialParameterPatterns.Ms,
		},
		[MaterialParameterNames.A]: {
			name: MaterialParameterNames.A,
			label: MaterialParameterLabels.A,
			unit: MaterialParameterUnits.A,
			placeholder: 'e.g., ' + DefaultValuesForYIG.A.toString(),
			defaultValue: 0,
			pattern: MaterialParameterPatterns.A,
		},
		[MaterialParameterNames.Ku]: {
			name: MaterialParameterNames.Ku,
			label: MaterialParameterLabels.Ku,
			unit: MaterialParameterUnits.Ku,
			placeholder: 'e.g., ' + DefaultValuesForYIG.Ku.toString(),
			defaultValue: 0,
			pattern: MaterialParameterPatterns.Ku,
		},
		[MaterialParameterNames.Ku_a]: {
			name: MaterialParameterNames.Ku_a,
			label: MaterialParameterLabels.Ku_a,
			unit: '',
			defaultValue: AxisNames.x,
		},
		[MaterialParameterNames.alpha]: {
			name: MaterialParameterNames.alpha,
			label: MaterialParameterLabels.alpha,
			unit: MaterialParameterUnits.alpha,
			placeholder: 'e.g., ' + DefaultValuesForYIG.alpha.toString(),
			defaultValue: 0.01,
			pattern: MaterialParameterPatterns.alpha,
		},
	},
};

export const materials: Record<MaterialType, Material> = {
	[MaterialType.YIG]: YIG,
	[MaterialType.GaYIG]: GaYIG,
	[MaterialType.Py]: Py,
	[MaterialType.Custom]: Custom,
};

const availableMaterials = Object.values(MaterialType);

export default availableMaterials;
