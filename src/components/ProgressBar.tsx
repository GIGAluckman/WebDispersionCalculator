interface ProgressBarProps {
	progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
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
