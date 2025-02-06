import SimplePlot from './SimplePlot';
import DownloadCSVButton from './DownloadCSVButton';
import './styles/DispersionResult.css';

interface DispersionResultProps {
	result: string | null;
}

export default function DispersionResult({ result }: DispersionResultProps) {
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

		const groupVelocityData = Object.keys(parsedResult)
			.filter((key) => key.includes('m/s'))
			.map((key) => ({
				data: Object.values(parsedResult[key]) as number[],
				label: `${key[1]} mode`,
			}));

		return (
			<div>
				<div className="d-flex justify-content-center">
					<div className="button p-2">
						<DownloadCSVButton data={result} />
					</div>
				</div>
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
							xData={xData}
							yData={groupVelocityData}
							xLabel="k (rad/µm)"
							yLabel="v (m/s)"
							plotTitle="Group velocity"
						/>
					</div>
				</div>
			</div>
		);
	}
}
