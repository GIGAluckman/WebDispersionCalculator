import { ExperimentType } from '../constants/experimentTypes';
import DispersionResult from './DispersionResult';

interface SimulationResultProps {
	result: string | null;
	chosenExperiment: ExperimentType;
}

export default function SimulationResult({
	result,
	chosenExperiment,
}: SimulationResultProps) {
	if (!result) {
		return null;
	} else {
		switch (chosenExperiment) {
			case ExperimentType.dispersion:
				return <DispersionResult result={result} />;
			default:
				return null;
		}
	}
}
