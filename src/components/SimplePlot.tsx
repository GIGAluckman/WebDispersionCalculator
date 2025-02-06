import { LineChart } from '@mui/x-charts/LineChart';
import './styles/SimplePlot.css';

interface SimplePlotProps {
	xData: number[];
	yData: { data: number[]; label: string }[];
	xLabel: string;
	yLabel: string;
	plotTitle?: string;
}

export default function SimplePlot({
	xData,
	yData,
	xLabel,
	yLabel,
	plotTitle,
}: SimplePlotProps) {
	return (
		<div>
			<h5 className="text-center">{plotTitle ? plotTitle : ''}</h5>
			<LineChart
				height={400}
				series={yData}
				xAxis={[
					{
						scaleType: 'linear',
						data: xData,
						label: xLabel,
					},
				]}
				yAxis={[{ label: yLabel }]}
				grid={{ horizontal: true, vertical: true }}
				className="custom"
			/>
		</div>
	);
}
