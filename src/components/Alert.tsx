import styles from './styles/Alert.module.css';

interface AlertProps {
	show: boolean;
	message: string;
	onClose: () => void;
}

export default function Alert({ show, message, onClose }: AlertProps) {
	if (show) {
		return (
			<div
				className={`alert alert-warning alert-dismissible fade show ${styles.alert}`}
			>
				<strong>Server error!</strong> {message}
				<button
					type="button"
					className="btn-close"
					data-bs-dismiss="alert"
					aria-label="Close"
					onClick={onClose}
				></button>
			</div>
		);
	} else {
		return null;
	}
}
