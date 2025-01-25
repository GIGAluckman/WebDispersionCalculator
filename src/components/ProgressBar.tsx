import { socket } from '../App';
import { useEffect, useState } from 'react';

export default function ProgressBar() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		socket.on('progress_update', (data) => {
			console.log('Progress: ', data.progress);
			setProgress(parseFloat(data.progress));
		});

		return () => {
			socket.off('progress_update');
			setProgress(0);
		};
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
