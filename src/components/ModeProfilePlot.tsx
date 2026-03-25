import Plot from 'react-plotly.js';

export interface ModeProfileData {
	x: number[];
	y: number[];
	z: number[][];
	geometry_type?: 'Waveguide' | 'Plane Film' | 'Wire';
}

interface ModeProfilePlotProps {
	data: ModeProfileData | null;
	loading: boolean;
	error: string | null;
	component?: 'x' | 'y' | 'z';
}

export default function ModeProfilePlot({
	data,
	loading,
	error,
	component = 'x',
}: ModeProfilePlotProps) {
	if (error) {
		return <div style={{ padding: '1rem', color: 'red' }}>{error}</div>;
	}
	if (!data) {
		if (loading) {
			return (
				<div style={{ padding: '1rem' }}>Loading mode profile...</div>
			);
		}
		return null;
	}

	const { x, y, z } = data;
	const flatZ = z.flat();
	const maxAbs = Math.max(...flatZ.map((v) => Math.abs(v)), 1e-10);

	const geo = data.geometry_type ?? 'Waveguide';
	const isWire = geo === 'Wire';
	const isPlaneFilm = geo === 'Plane Film';

	const trace = {
		type: 'heatmap' as const,
		x,
		y,
		z,
		colorscale: 'RdBu_r' as const,
		zmin: -maxAbs,
		zmax: maxAbs,
		colorbar: {
			title: { text: `m<sub>${component}</sub> (a.u.)` },
			thickness: 15,
			len: 0.95,
		},
	};

	const layout = {
		title: {
			text: `Mode profile (m<sub>${component}</sub>, <i>k</i> = 0)`,
			y: 0.9,
			x: 0.45,
		},
		autosize: true,
		height: 300,
		margin: { t: 50, b: 50, l: 50, r: 80 },
		xaxis: isPlaneFilm
			? {
					title: { text: '' },
					showticklabels: false,
					ticks: '' as const,
				}
			: { title: { text: 'Width (nm)' } },
		yaxis: { title: { text: 'Thickness (nm)' } },
		dragmode: false as const,
	};

	const containerStyle = {
		maxWidth: isWire ? 350 : isPlaneFilm ? 300 : 800,
		height: 300,
		minHeight: 230,
		margin: 0,
		overflow: 'hidden' as const,
	};

	return (
		<div style={containerStyle}>
			<Plot
				data={[trace]}
				layout={layout}
				config={{ responsive: true }}
				style={{ width: '100%', height: '100%' }}
			/>
		</div>
	);
}
