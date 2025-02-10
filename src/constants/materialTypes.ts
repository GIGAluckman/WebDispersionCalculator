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

enum MaterialParameterUnits {
	Ms = 'A/m',
	A = 'J/m',
	Ku = 'J/m³',
	Ku_a = '',
	alpha = '',
}

interface MaterialParameter {
	name: string;
	label: string;
	unit: string;
	defaultValue: number | AxisNames;
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
			defaultValue: 140000,
		},
		[MaterialParameterNames.A]: {
			name: MaterialParameterNames.A,
			label: MaterialParameterLabels.A,
			unit: MaterialParameterUnits.A,
			defaultValue: 3.4e-12,
		},
		[MaterialParameterNames.Ku]: {
			name: MaterialParameterNames.Ku,
			label: MaterialParameterLabels.Ku,
			unit: MaterialParameterUnits.Ku,
			defaultValue: 0,
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
			defaultValue: 0.0002,
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
			defaultValue: 21724.65,
		},
		[MaterialParameterNames.A]: {
			name: MaterialParameterNames.A,
			label: MaterialParameterLabels.A,
			unit: MaterialParameterUnits.A,
			defaultValue: 1.37e-12,
		},
		[MaterialParameterNames.Ku]: {
			name: MaterialParameterNames.Ku,
			label: MaterialParameterLabels.Ku,
			unit: MaterialParameterUnits.Ku,
			defaultValue: 857.04,
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
			defaultValue: 0.0007,
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
			defaultValue: 800000,
		},
		[MaterialParameterNames.A]: {
			name: MaterialParameterNames.A,
			label: MaterialParameterLabels.A,
			unit: MaterialParameterUnits.A,
			defaultValue: 13e-12,
		},
		[MaterialParameterNames.Ku]: {
			name: MaterialParameterNames.Ku,
			label: MaterialParameterLabels.Ku,
			unit: MaterialParameterUnits.Ku,
			defaultValue: 0,
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
			defaultValue: 0.01,
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
			defaultValue: 0,
		},
		[MaterialParameterNames.A]: {
			name: MaterialParameterNames.A,
			label: MaterialParameterLabels.A,
			unit: MaterialParameterUnits.A,
			defaultValue: 0,
		},
		[MaterialParameterNames.Ku]: {
			name: MaterialParameterNames.Ku,
			label: MaterialParameterLabels.Ku,
			unit: MaterialParameterUnits.Ku,
			defaultValue: 0,
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
			defaultValue: 0.01,
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
