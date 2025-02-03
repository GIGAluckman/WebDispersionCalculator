import { fetchProgressData } from '../hooks/fetchProgressData';
import styles from './styles/ProgressBar.module.css';

interface ProgressBarProps {
	simulationId: string;
}

export default function ProgressBar({ simulationId }: ProgressBarProps) {
	const { progress, status } = fetchProgressData(
		`${import.meta.env.VITE_BACKEND_URL}/status/${simulationId}`
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
