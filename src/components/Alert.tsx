import styles from './styles/Alert.module.css';

interface AlertProps {
	show: boolean;
	errorId: number | null;
	onClose: () => void;
}

const errorMessages: { [key: number]: string } = {
	0: 'Problem resolved, you can close this alert.',
	1: 'NaN values in the output! Check if you saturate the material, try to increase external field.',
	99: 'Server is not responding. Please try again later.',
	100: 'Server unexpected error. Please try again.',
};

export default function Alert({ show, errorId, onClose }: AlertProps) {
	console.log(errorId);
	console.log(show);
	if (show && errorId !== null) {
		return (
			<div
				className={`alert alert-warning alert-dismissible fade show ${styles.alert}`}
			>
				<strong>Server error!</strong> {errorMessages[errorId]}
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
