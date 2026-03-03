import { ExperimentType, DispersionData } from '../constants/experimentTypes';
import DispersionResult from './DispersionResult';

interface SimulationResultData {
	dispersion: DispersionData;
	numberOfModes: number;
}

interface SimulationResultProps {
	result: SimulationResultData | null;
	chosenExperiment: ExperimentType;
	errorId: number | null;
	simulationId: string;
}

export default function SimulationResult({
	result,
	chosenExperiment,
	errorId,
	simulationId,
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
						taskId={simulationId}
						numberOfModes={result.numberOfModes}
					/>
				);
			default:
				return null;
		}
	}
}
