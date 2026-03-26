import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { fontSize } from '../constants/axisNames';

export interface GridMeshData {
	points: [number, number][];
	triangles: [number, number, number][];
	values: number[];
}

interface GridPlotProps {
	data: GridMeshData | null;
	loading: boolean;
	error: string | null;
	xLabel?: string;
	yLabel?: string;
	colorbarLabel?: string;
	plotTitle?: string;
	hideXAxis?: boolean;
	maxPlotWidth?: number;
	plotHeight?: number;
	maxContainerWidth?: number;
	loadingMessage?: string;
}

const COLORBAR_WIDTH = 15;
const COLORBAR_PAD = 10;
const COLORBAR_LABEL_PAD = 70;

export default function GridPlot({
	data,
	loading,
	error,
	xLabel = '',
	yLabel = '',
	colorbarLabel = '',
	plotTitle = '',
	hideXAxis = false,
	maxPlotWidth = 500,
	plotHeight = 200,
	maxContainerWidth = 800,
	loadingMessage = 'Loading...',
}: GridPlotProps) {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const svg = d3.select(svgRef.current);
		svg.selectAll('*').remove();

		if (!data) return;
		const { points, triangles, values } = data;
		if (points.length === 0 || triangles.length === 0) return;

		const xs = points.map((p) => p[0]);
		const ys = points.map((p) => p[1]);
		const xExtent = d3.extent(xs) as [number, number];
		const yExtent = d3.extent(ys) as [number, number];

		const dataW = xExtent[1] - xExtent[0];
		const dataH = yExtent[1] - yExtent[0];
		const aspect = dataH > 0 ? dataW / dataH : 1;

		const margin = {
			top: 50,
			bottom: 50,
			left: 55,
			right: COLORBAR_PAD + COLORBAR_WIDTH + COLORBAR_LABEL_PAD,
		};
		const plotW = hideXAxis
			? plotHeight
			: Math.min(maxPlotWidth, plotHeight * aspect);

		const totalW = margin.left + plotW + margin.right;
		const totalH = margin.top + plotHeight + margin.bottom;

		svg.attr('width', totalW).attr('height', totalH);

		const g = svg
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		const xScale = d3.scaleLinear().domain(xExtent).range([0, plotW]);
		const yScale = d3
			.scaleLinear()
			.domain(yExtent)
			.range([plotHeight, 0]);

		// Color scale
		const maxAbs = Math.max(...values.map((v) => Math.abs(v)), 1e-10);
		const colorScale = d3
			.scaleDiverging<string>(d3.interpolateRdBu)
			.domain([maxAbs, 0, -maxAbs]);

		// Draw triangles
		const triGroup = g.append('g');
		triangles.forEach(([i, j, k]) => {
			const pts = [
				[xScale(points[i][0]), yScale(points[i][1])],
				[xScale(points[j][0]), yScale(points[j][1])],
				[xScale(points[k][0]), yScale(points[k][1])],
			];
			const meanVal = (values[i] + values[j] + values[k]) / 3;
			const c = colorScale(meanVal);

			triGroup
				.append('polygon')
				.attr('points', pts.map((p) => p.join(',')).join(' '))
				.attr('fill', c)
				.attr('stroke', c)
				.attr('stroke-width', 0.5);
		});

		// Axes
		if (!hideXAxis) {
			g.append('g')
				.attr('transform', `translate(0,${plotHeight})`)
				.call(d3.axisBottom(xScale).ticks(5))
				.selectAll('text')
				.attr('font-size', fontSize.axis);

			g.append('text')
				.attr('x', plotW / 2)
				.attr('y', plotHeight + 45)
				.attr('text-anchor', 'middle')
				.attr('font-size', fontSize.label)
				.text(xLabel);
		}

		g.append('g')
			.call(d3.axisLeft(yScale).ticks(5))
			.selectAll('text')
			.attr('font-size', fontSize.axis);

		g.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('x', -plotHeight / 2)
			.attr('y', -42)
			.attr('text-anchor', 'middle')
			.attr('font-size', fontSize.label)
			.text(yLabel);

		// Title
		svg.append('text')
			.attr('x', totalW / 2)
			.attr('y', 20)
			.attr('text-anchor', 'middle')
			.attr('font-size', fontSize.title)
			.attr('font-weight', '600')
			.html(plotTitle);

		// Colorbar
		const cbX = plotW + COLORBAR_PAD;
		const cbH = plotHeight;
		const numStops = 64;
		const defs = svg.append('defs');
		const gradId = 'cb-grad';
		const grad = defs
			.append('linearGradient')
			.attr('id', gradId)
			.attr('x1', '0%')
			.attr('y1', '0%')
			.attr('x2', '0%')
			.attr('y2', '100%');

		for (let s = 0; s <= numStops; s++) {
			const t = s / numStops;
			const val = maxAbs - t * 2 * maxAbs; // top=+maxAbs, bottom=-maxAbs
			grad.append('stop')
				.attr('offset', `${(t * 100).toFixed(1)}%`)
				.attr('stop-color', colorScale(val));
		}

		g.append('rect')
			.attr('x', cbX)
			.attr('y', 0)
			.attr('width', COLORBAR_WIDTH)
			.attr('height', cbH)
			.attr('fill', `url(#${gradId})`);

		const cbScale = d3
			.scaleLinear()
			.domain([maxAbs, -maxAbs])
			.range([0, cbH]);
		g.append('g')
			.attr('transform', `translate(${cbX + COLORBAR_WIDTH},0)`)
			.call(d3.axisRight(cbScale).ticks(5))
			.selectAll('text')
			.attr('font-size', fontSize.axis);

		g.append('text')
			.attr(
				'transform',
				`translate(${cbX + COLORBAR_WIDTH + 50},${cbH / 2}) rotate(90)`,
			)
			.attr('text-anchor', 'middle')
			.attr('font-size', fontSize.legend)
			.html(colorbarLabel);
	}, [
		data,
		xLabel,
		yLabel,
		colorbarLabel,
		plotTitle,
		hideXAxis,
		maxPlotWidth,
		plotHeight,
	]);

	if (error) {
		return <div style={{ padding: '1rem', color: 'red' }}>{error}</div>;
	}
	if (!data) {
		if (loading) {
			return <div style={{ padding: '1rem' }}>{loadingMessage}</div>;
		}
		return null;
	}

	const containerStyle: React.CSSProperties = {
		maxWidth: maxContainerWidth,
		minHeight: 230,
		margin: 0,
		overflow: 'hidden',
	};

	return (
		<div style={containerStyle}>
			<svg
				ref={svgRef}
				style={{ fontFamily: 'sans-serif', display: 'block' }}
			/>
		</div>
	);
}
