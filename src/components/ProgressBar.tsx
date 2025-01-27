import { useEffect, useState } from 'react';

interface ProgressBarProps {
	simulationId: string;
}

export default function ProgressBar({ simulationId }: ProgressBarProps) {
	const [progress, setProgress] = useState(0);

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
				console.log(data.status);
				// setProgress(data.progress);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
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
				{progress * 100}%
			</div>
		</div>
	);
}
