import { Box, LinearProgress, Typography } from '@mui/material';
import { useFetchProgressData } from '../hooks/useFetchProgressData';

interface ProgressBarProps {
	simulationId: string;
	setAlertToggle: (input: boolean) => void;
	setErrorId: (input: number | null) => void;
	setResult?: (result: any) => void;
	setLoading?: (loading: boolean) => void;
}

export default function ProgressBar({
	simulationId,
	setAlertToggle,
	setErrorId,
	setResult,
	setLoading,
}: ProgressBarProps) {
	const { progress, status } = useFetchProgressData(
		`${import.meta.env.VITE_BACKEND_URL}/status/${simulationId}`,
		setAlertToggle,
		setErrorId,
		setResult,
		setLoading,
		simulationId,
	);

	const isDeterminate =
		status === 'Dispersion calculation in progress' && progress !== 1;

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box sx={{ width: 980 }}>
				<Typography sx={{ mb: 0.1, mt: 0.9 }}>
					Simulation status: {status}
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Box sx={{ flexGrow: 1, position: 'relative', height: 13 }}>
						<LinearProgress
							variant="indeterminate"
							sx={{
								position: 'absolute',
								inset: 0,
								height: 13,
								borderRadius: 5,
								opacity: isDeterminate ? 0 : 1,
							}}
						/>
						<LinearProgress
							variant="determinate"
							value={progress * 100}
							sx={{
								position: 'absolute',
								inset: 0,
								height: 13,
								borderRadius: 5,
								opacity: isDeterminate ? 1 : 0,
							}}
						/>
					</Box>
					<Typography
						variant="body2"
						sx={{
							minWidth: 35,
							textAlign: 'right',
							fontSize: '1.1rem',
							visibility: isDeterminate ? 'visible' : 'hidden',
						}}
					>
						{`${(progress * 100).toFixed(0)}%`}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
}
