import { useEffect, useState } from 'react';

export function fetchProgressData(
	fetchUrl: string,
	setAlertToggle: (input: boolean) => void,
	setErrorId: (input: number | null) => void
) {
	const [progress, setProgress] = useState<number>(0);
	const [status, setStatus] = useState<string>('Beginning simulation');

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await fetch(fetchUrl);
			const data = await response.json();

			if (data.error === 99) {
				setAlertToggle(true);
				setErrorId(99);
				clearInterval(interval);
			} else {
				setProgress(data.progress);
				setStatus(data.status);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return { progress, status };
}
