import { AxisNames } from './axisNames';

export enum ModeProfileParameterNames {
	modeNumber = 'modeNumber',
	component = 'component',
}

enum ModeProfileParameterLabels {
	modeNumber = 'Mode number: ',
	component = 'Component: ',
}

export interface ModeProfileParameter {
	name: string;
	label: string;
	defaultValue: string;
	placeholder?: string;
	pattern?: {
		pattern: string;
		title: string;
	};
	unit?: string;
}

export const modeProfileParameters: Record<
	ModeProfileParameterNames,
	ModeProfileParameter
> = {
	[ModeProfileParameterNames.modeNumber]: {
		name: ModeProfileParameterNames.modeNumber,
		label: ModeProfileParameterLabels.modeNumber,
		defaultValue: '0',
		placeholder: 'e.g., 0, 1, 2',
		unit: '',
	},
	[ModeProfileParameterNames.component]: {
		name: ModeProfileParameterNames.component,
		label: ModeProfileParameterLabels.component,
		defaultValue: AxisNames.x,
	},
};
