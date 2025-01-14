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
			defaultValue: 200,
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
			defaultValue: 0,
			required: true,
			radio: false,
		},
		kMax: {
			name: 'kMax',
			label: 'Highest 𝑘: ',
			unit: 'rad/μm',
			defaultValue: 20,
			required: true,
			radio: false,
		},
		numberOfK: {
			name: 'numberOfK',
			label: 'Number of 𝑘 values: ',
			unit: '',
			defaultValue: 10,
			required: false,
			radio: false,
		},
		numberOfModes: {
			name: 'numberOfModes',
			label: 'Number of modes: ',
			unit: '',
			defaultValue: 3,
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
