import { AxisNames } from './axisNames';

export enum FieldProfileParameterNames {
	fieldName = 'fieldName',
	component = 'component',
}

export enum FieldNames {
	DemagField = 'Demagnetization field',
	ExchangeField = 'Exchange field',
	AnisotropyField = 'Anisotropy field',
	ExternalField = 'External field',
	TotalField = 'Total field',
}

enum FieldProfileParameterLabels {
	fieldName = 'Field name: ',
	component = 'Component: ',
}

export interface FieldProfileParameter {
	name: string;
	label: string;
	defaultValue: string;
}

export const fieldProfileParameters: Record<
	FieldProfileParameterNames,
	FieldProfileParameter
> = {
	[FieldProfileParameterNames.fieldName]: {
		name: FieldProfileParameterNames.fieldName,
		label: FieldProfileParameterLabels.fieldName,
		defaultValue: FieldNames.DemagField,
	},
	[FieldProfileParameterNames.component]: {
		name: FieldProfileParameterNames.component,
		label: FieldProfileParameterLabels.component,
		defaultValue: AxisNames.x,
	},
};

const availableFieldNames = Object.values(FieldNames);

export default availableFieldNames;
