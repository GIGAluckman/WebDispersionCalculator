import SimplePlot from './SimplePlot';
import DownloadCSVButton from './DownloadCSVButton';
import './styles/DispersionResult.css';

interface DispersionResultProps {
	result: string | null;
	errorId: number | null;
}

export default function DispersionResult({
	result,
	errorId,
}: DispersionResultProps) {
	if (!result) {
		return null;
	} else {
		const parsedResult = JSON.parse(result);

		const xData = Object.values(parsedResult['k (rad/µm)'] as number[]);

		const dispersionData = Object.keys(parsedResult)
			.filter((key) => key.includes('GHz'))
			.map((key) => ({
				data: Object.values(parsedResult[key]) as number[],
				label: `${key[1]} mode`,
			}));

		let xDataShifted: number[] = [];
		let groupVelocityData: { data: number[]; label: string }[] = [];
		let lifetimeData: { data: number[]; label: string }[] = [];
		let propagationLengthData: { data: number[]; label: string }[] = [];
		if (errorId !== 1) {
			xDataShifted = Object.values(
				parsedResult['kshift (rad/µm)'] as number[]
			);
			groupVelocityData = Object.keys(parsedResult)
				.filter((key) => key.includes('m/s'))
				.map((key) => ({
					data: Object.values(parsedResult[key]) as number[],
					label: `${key[1]} mode`,
				}));
			lifetimeData = Object.keys(parsedResult)
				.filter((key) => key.includes('lt'))
				.map((key) => ({
					data: Object.values(parsedResult[key]) as number[],
					label: `${key[2]} mode`,
				}));
			propagationLengthData = Object.keys(parsedResult)
				.filter((key) => key.includes('pl'))
				.map((key) => ({
					data: Object.values(parsedResult[key]) as number[],
					label: `${key[2]} mode`,
				}));
		}

		return (
			<div>
				<hr />
				<div className="imagecontainer">
					<div className="image">
						<SimplePlot
							xData={xData}
							yData={dispersionData}
							xLabel="k (rad/µm)"
							yLabel="f (GHz)"
							plotTitle="Dispersion relation"
						/>
					</div>
					<div className="image">
						<SimplePlot
							xData={xDataShifted}
							yData={groupVelocityData}
							xLabel="k (rad/µm)"
							yLabel="v (m/s)"
							plotTitle="Group velocity"
						/>
					</div>
					<div className="image">
						<SimplePlot
							xData={xData}
							yData={lifetimeData}
							xLabel="k (rad/µm)"
							yLabel="t (ns)"
							plotTitle="Lifetime"
						/>
					</div>
					<div className="image">
						<SimplePlot
							xData={xDataShifted}
							yData={propagationLengthData}
							xLabel="k (rad/µm)"
							yLabel="L (µm)"
							plotTitle="Propagation length"
						/>
					</div>
				</div>
				<div className="d-flex justify-content-center">
					<div className="button p-2">
						<DownloadCSVButton data={result} />
					</div>
				</div>
			</div>
		);
	}
}
