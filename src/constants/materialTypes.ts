import { MaterialParameterNames } from './materialParameterNames';
import { AxisNames } from './axisNames';

export enum Materials {
	custom = 'Custom',
	yig = 'YIG',
	gayig = 'GaYIG',
	py = 'Py',
}

export const materialParameters: Record<
	Materials,
	Partial<Record<MaterialParameterNames, number | string | AxisNames>>
> = {
	[Materials.yig]: {
		[MaterialParameterNames.ms]: 140000,
		[MaterialParameterNames.A]: 3.4e-12,
	},
	[Materials.gayig]: {
		[MaterialParameterNames.ms]: 21724.65,
		[MaterialParameterNames.A]: 1.37e-12,
		[MaterialParameterNames.ku]: 857.04,
		[MaterialParameterNames.kuAxis]: AxisNames.z,
	},
	[Materials.py]: {
		[MaterialParameterNames.ms]: 800000,
		[MaterialParameterNames.A]: 13e-12,
	},
	[Materials.custom]: {
		[MaterialParameterNames.ms]: 0,
		[MaterialParameterNames.A]: 0,
		[MaterialParameterNames.ku]: 0,
		[MaterialParameterNames.kuAxis]: AxisNames.x,
	},
} as const;

const availableMaterials = Object.values(Materials);

export default availableMaterials;
