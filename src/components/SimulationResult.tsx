import { Experiment } from '../constants/experimentTypes';
import DispersionResult from './DispersionResult';

interface SimulationResultProps {
	result: string | null;
	chosenExperiment: Experiment;
}

export default function SimulationResult({
	result,
	chosenExperiment,
}: SimulationResultProps) {
	if (!result) {
		return null;
	} else {
		switch (chosenExperiment) {
			case Experiment.dispersion:
				return <DispersionResult result={result} />;
			default:
				return null;
		}
	}
}
