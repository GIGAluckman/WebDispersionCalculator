import { AxisNames } from './axisNames';

export enum ExperimentType {
	dispersion = 'Dispersion',
}

interface ExperimentProperties {
	name: string;
	label: string;
	unit: string;
	radio: boolean;
	required: boolean;
	defaultValue: AxisNames | number;
	placeholder?: string;
}

enum DefaultValuesForDispersion {
	externalField = 400,
	kMin = 0,
	kMax = 20,
	numberOfK = 11,
	numberOfModes = 3,
}

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
		},
		kMax: {
			name: 'kMax',
			label: 'Highest 𝑘: ',
			unit: 'rad/μm',
			defaultValue: DefaultValuesForDispersion.kMax,
			placeholder: 'e.g., ' + DefaultValuesForDispersion.kMax.toString(),
			required: true,
			radio: false,
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
		},
	},
};

type AllExpriments = Experiment<DispersionProperties>;

export const experimentParameters: Record<ExperimentType, AllExpriments> = {
	[ExperimentType.dispersion]: dispersion,
};

const availableExperiments = Object.values(ExperimentType);

export default availableExperiments;
