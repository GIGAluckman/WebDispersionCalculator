import Plot from 'react-plotly.js';

export interface ModeProfileData {
	x: number[];
	y: number[];
	z: number[][];
}

interface ModeProfilePlotProps {
	data: ModeProfileData | null;
	loading: boolean;
	error: string | null;
}

export default function ModeProfilePlot({
	data,
	loading,
	error,
}: ModeProfilePlotProps) {
	if (loading) {
		return <div style={{ padding: '1rem' }}>Loading mode profile...</div>;
	}
	if (error) {
		return (
			<div style={{ padding: '1rem', color: 'red' }}>{error}</div>
		);
	}
	if (!data) {
		return null;
	}

	const { x, y, z } = data;
	const flatZ = z.flat();
	const maxAbs = Math.max(...flatZ.map((v) => Math.abs(v)), 1e-10);

	const trace = {
		type: 'heatmap' as const,
		x,
		y,
		z,
		colorscale: 'RdBu_r' as const,
		zmin: -maxAbs,
		zmax: maxAbs,
		colorbar: {
			title: { text: 'm_x (a.u.)' },
			thickness: 15,
			len: 0.6,
		},
	};

	const layout = {
		title: { text: 'Mode profile (m_x, k=0)' },
		autosize: true,
		height: 400,
		margin: { t: 50, b: 50, l: 50, r: 80 },
		xaxis: { title: { text: 'Width (nm)' } },
		yaxis: { title: { text: 'Thickness (nm)' } },
		dragmode: false as const,
	};

	return (
		<div
			style={{
				width: '100%',
				maxWidth: 1200,
				height: 400,
				minHeight: 400,
				margin: '0 auto',
				border: '1px solid #ccc',
				borderRadius: 4,
				overflow: 'hidden',
			}}
		>
			<Plot
				data={[trace]}
				layout={layout}
				config={{ responsive: true }}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}
