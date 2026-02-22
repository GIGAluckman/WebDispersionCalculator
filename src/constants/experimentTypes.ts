import { AxisNames } from './axisNames';
import { PatternProperties } from './materialTypes';

export enum ExperimentType {
	dispersion = 'Dispersion',
}

export type DispersionData = Record<string, Record<string, number>>;

interface ExperimentProperties {
	name: string;
	label: string;
	unit: string;
	radio: boolean;
	required: boolean;
	defaultValue: AxisNames | number;
	placeholder?: string;
	pattern?: PatternProperties;
}

enum DefaultValuesForDispersion {
	externalField = 400,
	kMin = 0,
	kMax = 20,
	numberOfK = 11,
	numberOfModes = 3,
}

interface DispersionPatterns {
	externalField: PatternProperties;
	kMin: PatternProperties;
	kMax: PatternProperties;
	numberOfK: PatternProperties;
	numberOfModes: PatternProperties;
}

const DispersionPatterns: DispersionPatterns = {
	externalField: {
		pattern: '[\\+\\-]?(\\d+)(\\.\\d+)?',
		title: 'Please enter a valid decimal number (e.g., 400, 103.4, -20.56).',
	},
	kMin: {
		pattern: '[\\+\\-]?(\\d+)(\\.\\d+)?',
		title: 'Please enter a valid decimal number (e.g., 0, 3.4, -2.56).',
	},
	kMax: {
		pattern: '[\\+\\-]?(\\d+)(\\.\\d+)?',
		title: 'Please enter a valid decimal number (e.g., 20, 3.4, -2.56).',
	},
	numberOfK: {
		pattern: '[1-9]\\d*',
		title: 'Please enter a positive integer (e.g., 11, 50, 100).',
	},
	numberOfModes: {
		pattern: '[1-9]\\d*',
		title: 'Please enter a positive integer (e.g., 3, 5, 10).',
	},
};

interface DispersionProperties {
	externalField: ExperimentProperties;
	fieldAxis: ExperimentProperties;
	kMin: ExperimentProperties;
	kMax: ExperimentProperties;
	numberOfK: ExperimentProperties;
	numberOfModes: ExperimentProperties;
}

interface Experiment<T> {
	type: ExperimentType;
	parameters: T;
}

const dispersion: Experiment<DispersionProperties> = {
	type: ExperimentType.dispersion,
	parameters: {
		externalField: {
			name: 'externalField',
			label: 'External field strength: ',
			unit: 'mT',
			defaultValue: DefaultValuesForDispersion.externalField,
			placeholder:
				'e.g., ' + DefaultValuesForDispersion.externalField.toString(),
			required: true,
			radio: false,
			pattern: DispersionPatterns.externalField,
		},
		fieldAxis: {
			name: 'fieldAxis',
			label: 'External field axis: ',
			unit: '',
			defaultValue: AxisNames.x,
			required: true,
			radio: true,
		},
		kMin: {
			name: 'kMin',
			label: 'Lowest 𝑘: ',
			unit: 'rad/μm',
			defaultValue: DefaultValuesForDispersion.kMin,
			placeholder: 'e.g., ' + DefaultValuesForDispersion.kMin.toString(),
			required: true,
			radio: false,
			pattern: DispersionPatterns.kMin,
		},
		kMax: {
			name: 'kMax',
			label: 'Highest 𝑘: ',
			unit: 'rad/μm',
			defaultValue: DefaultValuesForDispersion.kMax,
			placeholder: 'e.g., ' + DefaultValuesForDispersion.kMax.toString(),
			required: true,
			radio: false,
			pattern: DispersionPatterns.kMax,
		},
		numberOfK: {
			name: 'numberOfK',
			label: 'Number of 𝑘 values: ',
			unit: '',
			defaultValue: DefaultValuesForDispersion.numberOfK,
			placeholder:
				'e.g., ' + DefaultValuesForDispersion.numberOfK.toString(),
			required: false,
			radio: false,
			pattern: DispersionPatterns.numberOfK,
		},
		numberOfModes: {
			name: 'numberOfModes',
			label: 'Number of modes: ',
			unit: '',
			defaultValue: DefaultValuesForDispersion.numberOfModes,
			placeholder:
				'e.g., ' + DefaultValuesForDispersion.numberOfModes.toString(),
			required: true,
			radio: false,
			pattern: DispersionPatterns.numberOfModes,
		},
	},
};

type AllExpriments = Experiment<DispersionProperties>;

export const experimentParameters: Record<ExperimentType, AllExpriments> = {
	[ExperimentType.dispersion]: dispersion,
};

const availableExperiments = Object.values(ExperimentType);

export default availableExperiments;
