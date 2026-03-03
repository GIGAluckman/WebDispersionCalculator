import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SimplePlot from './SimplePlot';
import DownloadCSVButton from './DownloadCSVButton';
import ModeProfilePlot, { type ModeProfileData } from './ModeProfilePlot';
import './styles/DispersionResult.css';
import { DispersionData } from '../constants/experimentTypes';

interface DispersionResultProps {
	result: DispersionData | null;
	errorId: number | null;
	taskId: string;
	numberOfModes: number;
}

export default function DispersionResult({
	result,
	errorId,
	taskId,
	numberOfModes,
}: DispersionResultProps) {
	const [modeNumber, setModeNumber] = useState('0');
	const [modeProfileLoading, setModeProfileLoading] = useState(false);
	const [modeProfileData, setModeProfileData] =
		useState<ModeProfileData | null>(null);
	const [modeProfileError, setModeProfileError] = useState<string | null>(
		null,
	);
	if (!result) {
		return null;
	} else {
		const xData = Object.values(
			result['k (rad/µm)'] as unknown as number[],
		);

		const dispersionData = Object.keys(result)
			.filter((key) => key.includes('GHz'))
			.map((key) => ({
				data: Object.values(result[key]) as unknown as number[],
				label: `${key[1]} mode`,
			}));

		let xDataShifted: number[] = [];
		let groupVelocityData: { data: number[]; label: string }[] = [];
		let lifetimeData: { data: number[]; label: string }[] = [];
		let propagationLengthData: { data: number[]; label: string }[] = [];
		if (errorId !== 1) {
			xDataShifted = Object.values(
				result['kshift (rad/µm)'],
			) as unknown as number[];
			groupVelocityData = Object.keys(result)
				.filter((key) => key.includes('m/s'))
				.map((key) => ({
					data: Object.values(result[key]) as unknown as number[],
					label: `${key[1]} mode`,
				}));
			lifetimeData = Object.keys(result)
				.filter((key) => key.includes('lt'))
				.map((key) => ({
					data: Object.values(result[key]) as unknown as number[],
					label: `${key[2]} mode`,
				}));
			propagationLengthData = Object.keys(result)
				.filter((key) => key.includes('pl'))
				.map((key) => ({
					data: Object.values(result[key]) as unknown as number[],
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
				<div className="d-flex justify-content-center">
					<div className="button p-2">
						<TextField
							type="number"
							label="Mode number"
							value={modeNumber}
							onChange={(e) => setModeNumber(e.target.value)}
							inputProps={{
								min: 0,
								max: numberOfModes - 1,
								step: 1,
							}}
							size="small"
							sx={{ width: 120 }}
						/>
						<Button
							variant="contained"
							onClick={async () => {
								const mode = parseInt(modeNumber, 10);
								if (
									isNaN(mode) ||
									mode < 0 ||
									mode >= numberOfModes
								) {
									setModeProfileError(
										`Mode must be between 0 and ${numberOfModes - 1}`,
									);
									setModeProfileData(null);
									return;
								}
								setModeProfileError(null);
								setModeProfileLoading(true);
								setModeProfileData(null);
								try {
									const backendUrl = import.meta.env
										.VITE_BACKEND_URL;
									const res = await fetch(
										`${backendUrl}/get_mode_profile?task_id=${taskId}&mode=${mode}`,
									);
									if (!res.ok) {
										const errData = await res
											.json()
											.catch(() => ({}));
										throw new Error(
											errData.error ||
												`HTTP ${res.status}`,
										);
									}
									const data = await res.json();
									setModeProfileData(data);
								} catch (err) {
									setModeProfileError(
										err instanceof Error
											? err.message
											: 'Failed to load mode profile',
									);
								} finally {
									setModeProfileLoading(false);
								}
							}}
						>
							Get mode profile
						</Button>
					</div>
				</div>
				{(modeProfileLoading ||
					modeProfileData ||
					modeProfileError) && (
					<div className="p-2">
						<ModeProfilePlot
							data={modeProfileData}
							loading={modeProfileLoading}
							error={modeProfileError}
						/>
					</div>
				)}
			</div>
		);
	}
}
