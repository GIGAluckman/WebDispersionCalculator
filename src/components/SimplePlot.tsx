import { LineChart } from '@mui/x-charts/LineChart';
import './styles/SimplePlot.css';
import { useRef } from 'react';

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
	const containerRef = useRef<HTMLDivElement>(null);

	const downloadAsPNG = () => {
		if (containerRef.current) {
			// Use html2canvas to capture the chart
			import('html2canvas').then((html2canvas) => {
				html2canvas.default(containerRef.current!).then((canvas) => {
					// Create a download link
					const link = document.createElement('a');
					link.download = `${plotTitle || 'chart'}.png`;
					link.href = canvas.toDataURL('image/png');
					link.click();
				});
			});
		}
	};

	return (
		<div>
			<button
				className="btn btn-outline-secondary btn-sm float-end me-5"
				onClick={downloadAsPNG}
			>
				PNG
			</button>
			<div ref={containerRef}>
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
		</div>
	);
}
