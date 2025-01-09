import { MaterialParameterNames } from './materialParameterNames';

export const inputMaterialLoopParams: Record<
	MaterialParameterNames,
	{ name: string; label: string; unit: string }
> = {
	[MaterialParameterNames.ms]: {
		name: 'saturationMagnetization',
		label: 'Saturation magnetization: ',
		unit: 'A/m',
	},
	[MaterialParameterNames.A]: {
		name: 'exchangeStiffness',
		label: 'Exchange stiffness: ',
		unit: 'J/m',
	},
	[MaterialParameterNames.ku]: {
		name: 'anisotropyConstant',
		label: 'Anisotropy constant: ',
		unit: 'J/m³',
	},
	[MaterialParameterNames.kuAxis]: {
		name: 'anisotropyAxis',
		label: 'Anisotropy axis: ',
		unit: '',
	},
} as const;
