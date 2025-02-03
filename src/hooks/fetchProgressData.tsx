import { useEffect, useState } from 'react';

export function fetchProgressData(fetchUrl: string) {
	const [progress, setProgress] = useState<number>(0);
	const [status, setStatus] = useState<string>('Beginning simulation');

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await fetch(fetchUrl);
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

	return { progress, status };
}
