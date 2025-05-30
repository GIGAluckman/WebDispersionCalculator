import { useEffect, useState } from 'react';

export function fetchProgressData(
	fetchUrl: string,
	setAlertToggle: (input: boolean) => void,
	setErrorId: (input: number | null) => void
) {
	const [progress, setProgress] = useState<number>(0);
	const [status, setStatus] = useState<string>('Beginning simulation');

	useEffect(() => {
		// Initial delay before starting polling
		const initialDelay = setTimeout(() => {
			const interval = setInterval(async () => {
				const response = await fetch(fetchUrl);
				const data = await response.json();

				if (data.error === 99) {
					setAlertToggle(true);
					setErrorId(99);
					console.log('Error 99: Server unexpected error');
					clearInterval(interval);
					clearTimeout(initialDelay);
				} else if (data.error === 100) {
					setAlertToggle(true);
					setErrorId(100);
					console.log('Error 100: Server is not responding');
					clearInterval(interval);
					clearTimeout(initialDelay);
				} else {
					setProgress(data.progress);
					setStatus(data.status);
				}
			}, 2000);

			// Cleanup function
			return () => {
				clearInterval(interval);
			};
		}, 3000);

		// Cleanup for the initial delay
		return () => {
			clearTimeout(initialDelay);
		};
	}, []);

	return { progress, status };
}
