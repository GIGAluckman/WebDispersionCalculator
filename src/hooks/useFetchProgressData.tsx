import { useEffect, useState, useRef } from 'react';

export function useFetchProgressData(
	fetchUrl: string,
	setAlertToggle: (input: boolean) => void,
	setErrorId: (input: number | null) => void
) {
	const [progress, setProgress] = useState<number>(0);
	const [status, setStatus] = useState<string>('Beginning simulation');
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Initial delay before starting polling
		const initialDelay = setTimeout(() => {
			intervalRef.current = setInterval(async () => {
				const response = await fetch(fetchUrl);
				const data = await response.json();

				if (data.error === 99) {
					setAlertToggle(true);
					setErrorId(99);
					console.error('Error 99: Server unexpected error');
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
					}
				} else if (data.error === 100) {
					setAlertToggle(true);
					setErrorId(100);
					console.error('Error 100: Server is not responding');
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
					}
				} else {
					console.log('Status checked, progress: ', data.progress);
					setProgress(data.progress);
					setStatus(data.status);
				}
			}, 2000);
		}, 3000);

		// Cleanup function
		return () => {
			clearTimeout(initialDelay);
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [fetchUrl]);

	return { progress, status };
}
