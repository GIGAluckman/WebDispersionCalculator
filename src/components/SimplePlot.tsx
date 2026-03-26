import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface SimplePlotProps {
	xData: number[];
	yData: { data: (number | null)[]; label: string }[];
	xLabel: string;
	yLabel: string;
	plotTitle?: string;
}

const margin = { top: 40, right: 130, bottom: 50, left: 65 };
const width = 520;
const height = 400;
const innerW = width - margin.left - margin.right;
const innerH = height - margin.top - margin.bottom;

export default function SimplePlot({
	xData,
	yData,
	xLabel,
	yLabel,
	plotTitle,
}: SimplePlotProps) {
	const svgRef = useRef<SVGSVGElement>(null);

	const ifYDataIsEmpty = yData.every((item) =>
		item.data.every((d) => d === null),
	);

	useEffect(() => {
		const svg = d3.select(svgRef.current);
		svg.selectAll('*').remove();

		if (ifYDataIsEmpty || xData.length === 0) return;

		const g = svg
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Scales
		const xExtent = d3.extent(xData) as [number, number];
		const xScale = d3.scaleLinear().domain(xExtent).range([0, innerW]);

		const allValues = yData.flatMap((s) =>
			s.data.filter((d): d is number => d !== null),
		);
		const yExtent = d3.extent(allValues) as [number, number];
		const yScale = d3
			.scaleLinear()
			.domain(yExtent)
			.nice()
			.range([innerH, 0]);

		// Grid
		g.append('g')
			.attr('class', 'grid-h')
			.call(
				d3
					.axisLeft(yScale)
					.tickSize(-innerW)
					.tickFormat(() => ''),
			)
			.selectAll('line')
			.attr('stroke', '#ccc')
			.attr('stroke-dasharray', '3,3');
		g.select('.grid-h').select('.domain').remove();

		g.append('g')
			.attr('class', 'grid-v')
			.attr('transform', `translate(0,${innerH})`)
			.call(
				d3
					.axisBottom(xScale)
					.tickSize(-innerH)
					.tickFormat(() => ''),
			)
			.selectAll('line')
			.attr('stroke', '#ccc')
			.attr('stroke-dasharray', '3,3');
		g.select('.grid-v').select('.domain').remove();

		// Axes
		g.append('g')
			.attr('transform', `translate(0,${innerH})`)
			.call(d3.axisBottom(xScale))
			.selectAll('text')
			.attr('font-size', '15px');

		g.append('g')
			.call(d3.axisLeft(yScale))
			.selectAll('text')
			.attr('font-size', '15px');

		// Axis labels
		g.append('text')
			.attr('x', innerW / 2)
			.attr('y', innerH + 45)
			.attr('text-anchor', 'middle')
			.attr('font-size', '19.5px')
			.text(xLabel);

		g.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('x', -innerH / 2)
			.attr('y', -50)
			.attr('text-anchor', 'middle')
			.attr('font-size', '19.5px')
			.text(yLabel);

		// Title
		if (plotTitle) {
			svg.append('text')
				.attr('x', width / 2)
				.attr('y', 22)
				.attr('text-anchor', 'middle')
				.attr('font-size', '22.5px')
				.attr('font-weight', '600')
				.text(plotTitle);
		}

		// Lines
		const color = d3.scaleOrdinal(d3.schemeCategory10);

		yData.forEach((series, i) => {
			const lineData = xData.map((x, j) => ({
				x,
				y: series.data[j],
			}));

			const line = d3
				.line<{ x: number; y: number | null }>()
				.defined((d) => d.y !== null)
				.x((d) => xScale(d.x))
				.y((d) => yScale(d.y!));

			g.append('path')
				.datum(lineData)
				.attr('fill', 'none')
				.attr('stroke', color(String(i)))
				.attr('stroke-width', 3)
				.attr('d', line);
		});

		// Legend
		const legendX = innerW + 15;
		yData.forEach((series, i) => {
			const ly = i * 25;
			g.append('line')
				.attr('x1', legendX)
				.attr('y1', ly + 3)
				.attr('x2', legendX + 18)
				.attr('y2', ly + 3)
				.attr('stroke', color(String(i)))
				.attr('stroke-width', 3);

			g.append('text')
				.attr('x', legendX + 23)
				.attr('y', ly + 8)
				.attr('font-size', '16.5px')
				.text(series.label);
		});
	}, [xData, yData, xLabel, yLabel, plotTitle, ifYDataIsEmpty]);

	const downloadAsPNG = () => {
		const svgEl = svgRef.current;
		if (!svgEl) return;

		const serializer = new XMLSerializer();
		const svgStr = serializer.serializeToString(svgEl);
		const svgBlob = new Blob([svgStr], {
			type: 'image/svg+xml;charset=utf-8',
		});
		const url = URL.createObjectURL(svgBlob);

		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = width * 2;
			canvas.height = height * 2;
			const ctx = canvas.getContext('2d')!;
			ctx.scale(2, 2);
			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, width, height);
			ctx.drawImage(img, 0, 0, width, height);
			URL.revokeObjectURL(url);

			const link = document.createElement('a');
			link.download = `${plotTitle || 'chart'}.png`;
			link.href = canvas.toDataURL('image/png');
			link.click();
		};
		img.src = url;
	};

	return (
		<div>
			<button
				className="btn btn-outline-secondary btn-sm float-end me-5"
				onClick={downloadAsPNG}
			>
				PNG
			</button>
			<svg
				ref={svgRef}
				width={width}
				height={height}
				style={{ fontFamily: 'sans-serif' }}
			/>
		</div>
	);
}
