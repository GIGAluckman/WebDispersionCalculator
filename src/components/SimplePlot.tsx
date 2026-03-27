import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Button } from '@mui/material';
import { fontSize } from '../constants/axisNames';

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
	const tooltipRef = useRef<HTMLDivElement>(null);

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
			.attr('font-size', fontSize.axis);

		g.append('g')
			.call(d3.axisLeft(yScale))
			.selectAll('text')
			.attr('font-size', fontSize.axis);

		// Axis labels
		g.append('text')
			.attr('x', innerW / 2)
			.attr('y', innerH + 45)
			.attr('text-anchor', 'middle')
			.attr('font-size', fontSize.label)
			.text(xLabel);

		g.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('x', -innerH / 2)
			.attr('y', -50)
			.attr('text-anchor', 'middle')
			.attr('font-size', fontSize.label)
			.text(yLabel);

		// Title
		if (plotTitle) {
			svg.append('text')
				.attr('x', width / 2)
				.attr('y', 22)
				.attr('text-anchor', 'middle')
				.attr('font-size', fontSize.title)
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
			const ly = i * 25 + 10;
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
				.attr('font-size', fontSize.legend)
				.text(series.label);
		});

		// --- Interactive hover ---
		const crosshair = g
			.append('line')
			.attr('y1', 0)
			.attr('y2', innerH)
			.attr('stroke', '#666')
			.attr('stroke-width', 1)
			.attr('stroke-dasharray', '4,3')
			.style('opacity', 0);

		const dots = yData.map((_, i) =>
			g
				.append('circle')
				.attr('r', 4.5)
				.attr('fill', color(String(i)))
				.attr('stroke', '#fff')
				.attr('stroke-width', 1.5)
				.style('opacity', 0),
		);

		const tooltip = d3.select(tooltipRef.current);
		const bisect = d3.bisector((d: number) => d).left;

		g.append('rect')
			.attr('width', innerW)
			.attr('height', innerH)
			.attr('fill', 'none')
			.attr('pointer-events', 'all')
			.on('mousemove', (event: MouseEvent) => {
				const [mx] = d3.pointer(event);
				const xVal = xScale.invert(mx);
				let idx = bisect(xData, xVal);
				// snap to nearest point
				if (idx > 0 && idx < xData.length) {
					const dLeft = Math.abs(xData[idx - 1] - xVal);
					const dRight = Math.abs(xData[idx] - xVal);
					if (dLeft < dRight) idx = idx - 1;
				} else if (idx >= xData.length) {
					idx = xData.length - 1;
				}

				const snappedX = xScale(xData[idx]);
				crosshair
					.attr('x1', snappedX)
					.attr('x2', snappedX)
					.style('opacity', 1);

				let html = `<div style="font-weight:600;margin-bottom:3px">${xLabel}: ${xData[idx].toPrecision(4)}</div>`;
				yData.forEach((series, i) => {
					const val = series.data[idx];
					if (val === null) return;
					dots[i]
						.attr('cx', snappedX)
						.attr('cy', yScale(val))
						.style('opacity', 1);
					html +=
						`<div style="display:flex;align-items:center;gap:4px">` +
						`<span style="width:10px;height:10px;border-radius:2px;background:${color(String(i))};display:inline-block"></span>` +
						`${series.label}: ${val.toPrecision(4)}</div>`;
				});

				// hide dots for null values
				yData.forEach((series, i) => {
					if (series.data[idx] === null) dots[i].style('opacity', 0);
				});

				tooltip.html(html).style('opacity', 1);

				// position tooltip relative to container
				const tooltipX = snappedX + margin.left + 12;
				const tooltipY = margin.top;
				tooltip
					.style('left', `${tooltipX}px`)
					.style('top', `${tooltipY}px`);
			})
			.on('mouseleave', () => {
				crosshair.style('opacity', 0);
				dots.forEach((d) => d.style('opacity', 0));
				tooltip.style('opacity', 0);
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
		<div style={{ position: 'relative', display: 'inline-block' }}>
			<Button
				variant="outlined"
				sx={{
					color: 'grey.700',
					borderColor: 'grey.700',
					position: 'absolute',
					top: 0,
					right: 50,
					zIndex: 1,
					minWidth: 'auto',
					padding: '2px 8px',
					fontSize: '0.9rem',
				}}
				onClick={downloadAsPNG}
			>
				PNG
			</Button>
			<svg
				ref={svgRef}
				width={width}
				height={height}
				style={{ fontFamily: 'sans-serif' }}
			/>
			<div
				ref={tooltipRef}
				style={{
					position: 'absolute',
					pointerEvents: 'none',
					opacity: 0,
					background: 'rgba(255,255,255,0.95)',
					border: '1px solid #ccc',
					borderRadius: '4px',
					padding: '6px 10px',
					fontSize: '12px',
					fontFamily: 'sans-serif',
					boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
					whiteSpace: 'nowrap',
				}}
			/>
		</div>
	);
}
