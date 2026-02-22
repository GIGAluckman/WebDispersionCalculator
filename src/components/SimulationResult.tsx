import { ExperimentType, DispersionData } from '../constants/experimentTypes';
import DispersionResult from './DispersionResult';

interface SimulationResultProps {
	result: DispersionData | null;
	chosenExperiment: ExperimentType;
	errorId: number | null;
}

export default function SimulationResult({
	result,
	chosenExperiment,
	errorId,
}: SimulationResultProps) {
	if (!result || errorId === 99 || errorId === 100) {
		return null;
	} else {
		switch (chosenExperiment) {
			case ExperimentType.dispersion:
				return <DispersionResult result={result} errorId={errorId} />;
			default:
				return null;
		}
	}
}
