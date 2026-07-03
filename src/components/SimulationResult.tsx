import {
	ExperimentType,
	SimulationResultData,
} from '../constants/experimentTypes';
import DispersionResult from './DispersionResult';

interface SimulationResultProps {
	result: SimulationResultData | null;
	chosenExperiment: ExperimentType;
	errorId: number | null;
	simulationId: string;
	simulationLoading: boolean;
}

export default function SimulationResult({
	result,
	chosenExperiment,
	errorId,
	simulationId,
	simulationLoading,
}: SimulationResultProps) {
	if (!result?.dispersion || errorId === 99 || errorId === 100) {
		return null;
	} else {
		switch (chosenExperiment) {
			case ExperimentType.dispersion:
				return (
					<DispersionResult
						result={result.dispersion}
						errorId={errorId}
						simulationId={simulationId}
						numberOfModes={result.numberOfModes}
						simulationLoading={simulationLoading}
					/>
				);
			default:
				return null;
		}
	}
}
