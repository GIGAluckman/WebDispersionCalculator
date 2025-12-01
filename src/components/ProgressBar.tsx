import { useFetchProgressData } from '../hooks/useFetchProgressData';
import styles from './styles/ProgressBar.module.css';

interface ProgressBarProps {
	simulationId: string;
	setAlertToggle: (input: boolean) => void;
	setErrorId: (input: number | null) => void;
}

export default function ProgressBar({
	simulationId,
	setAlertToggle,
	setErrorId,
}: ProgressBarProps) {
	const { progress, status } = useFetchProgressData(
		`${import.meta.env.VITE_BACKEND_URL}/status/${simulationId}`,
		setAlertToggle,
		setErrorId
	);

	return (
		<div className="d-flex justify-content-center">
			<div className={styles.colprogress}>
				Simulation status: {status}
				<div
					className="progress"
					role="progressbar"
					aria-valuenow={progress}
					aria-valuemin={0}
					aria-valuemax={1}
				>
					<div
						className="progress-bar"
						style={{ width: `${progress * 100}%` }}
					>
						{(progress * 100).toFixed(0)}%
					</div>
				</div>
			</div>
		</div>
	);
}
