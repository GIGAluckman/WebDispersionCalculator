import { AxisNames } from './axisNames';

export enum ModeProfileParameterNames {
	modeNumber = 'modeNumber',
	component = 'component',
	wavevector = 'wavevector',
}

enum ModeProfileParameterLabels {
	modeNumber = 'Mode number: ',
	component = 'Component: ',
	wavevector = 'Wavevector 𝑘: ',
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
	[ModeProfileParameterNames.wavevector]: {
		name: ModeProfileParameterNames.wavevector,
		label: ModeProfileParameterLabels.wavevector,
		defaultValue: '0',
		placeholder: 'e.g., 0, -10.2',
		pattern: {
			pattern: `^[+\\-]?(\\d+)(\\.\\d+)?$`,
			title: `Please enter a valid decimal number (e.g., 0, -10.2, 15.5).`,
		},
		unit: ' rad/µm',
	},
};
