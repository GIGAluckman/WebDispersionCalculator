export interface ErrorInfo {
	title: string;
	message: string;
	warning?: boolean;
}

// Codes 0-6 and 99 mirror the backend's helpers.ErrorCode enum — do not renumber.
// 100 is client-side only: the server could not be reached at all.
export const CONNECTION_ERROR = 100;

const ERROR_CODES: Record<number, ErrorInfo> = {
	0: {
		title: 'Resolved',
		message: 'Problem resolved, you can close this alert.',
	},
	1: {
		title: 'Simulation warning',
		message:
			'NaN values in the output! Check if you saturate the material, try to increase external field.',
		warning: true,
	},
	2: {
		title: 'Simulation failed',
		message:
			'The magnetic state did not relax to equilibrium, so no dispersion was calculated. Try different material parameters or a stronger external field.',
	},
	3: {
		title: 'Not supported',
		message: 'This experiment type is not supported yet.',
	},
	4: {
		title: 'Time limit reached',
		message: 'The simulation reached the time limit, retry with softer parameters.',
	},
	5: {
		title: 'Memory limit reached',
		message:
			'The simulation hit the memory limit of the container. Retry with softer parameters (coarser mesh, fewer k-points or modes).',
	},
	6: {
		title: 'Simulation failed',
		message:
			'The simulation crashed repeatedly, possibly out of memory. Retry with softer parameters.',
	},
	99: {
		title: 'Server error',
		message: 'Server unexpected error. Please try again.',
	},
	100: {
		title: 'Connection error',
		message: 'Server is not responding. Please try again later.',
	},
};

export function getErrorInfo(errorId: number | null): ErrorInfo {
	if (errorId !== null && errorId in ERROR_CODES) {
		return ERROR_CODES[errorId];
	}
	return {
		title: 'Error',
		message: `An unexpected error occurred (code ${errorId ?? 'unknown'}). Please try again.`,
	};
}
