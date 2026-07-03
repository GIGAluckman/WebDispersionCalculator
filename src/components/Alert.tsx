import { getErrorInfo } from '../constants/errorCodes';
import styles from './styles/Alert.module.css';

interface AlertProps {
	show: boolean;
	errorId: number | null;
	onClose: () => void;
}

export default function Alert({ show, errorId, onClose }: AlertProps) {
	if (show && errorId !== null) {
		const { title, message } = getErrorInfo(errorId);
		return (
			<div
				role="alert"
				className={`alert alert-warning alert-dismissible fade show ${styles.alert}`}
			>
				<strong>{title}!</strong> {message}
				<button
					type="button"
					className="btn-close"
					aria-label="Close"
					onClick={onClose}
				></button>
			</div>
		);
	} else {
		return null;
	}
}
