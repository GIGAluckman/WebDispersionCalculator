import { LineChart } from '@mui/x-charts/LineChart';
import DownloadCSV from './DownloadCSV';
import './DispersionResult.css';

interface DispersionResultProps {
	result: string | null;
}

export default function DispersionResult({ result }: DispersionResultProps) {
	if (!result) {
		return null;
	} else {
		const parsedResult = JSON.parse(result);

		const xData = Object.values(parsedResult['k (rad/µm)']);

		const plotData = Object.keys(parsedResult)
			.filter((key) => key !== 'k (rad/µm)')
			.map((key) => ({
				data: Object.values(parsedResult[key]) as number[],
				label: `${key[1]} mode`,
			}));

		return (
			<div className="d-flex justify-content-center">
				<div className="button p-2">
					<DownloadCSV data={result} />
				</div>
				<div className="image p-2">
					<LineChart
						className="custom"
						width={600}
						height={400}
						series={plotData}
						xAxis={[
							{
								scaleType: 'linear',
								data: xData,
								label: 'k (rad/μm)',
							},
						]}
						yAxis={[{ label: 'Frequency (GHz)' }]}
						grid={{ horizontal: true, vertical: true }}
					/>
				</div>
			</div>
		);
	}
}
