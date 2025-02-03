import { useEffect, useState } from 'react';
import styles from './styles/ProgressBar.module.css';

interface ProgressBarProps {
	simulationId: string;
}

export default function ProgressBar({ simulationId }: ProgressBarProps) {
	const [progress, setProgress] = useState<number>(0);
	const [status, setStatus] = useState<string>('Beginning simulation');
	console.log('Simulation ID: ', simulationId);

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/status/${simulationId}`
			);
			const data = await response.json();

			if (data.error) {
				clearInterval(interval);
				alert('Simulation not found!');
			} else {
				setProgress(data.progress);
				setStatus(data.status);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

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
