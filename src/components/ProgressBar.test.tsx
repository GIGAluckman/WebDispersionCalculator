import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

const hookState = { progress: 0.5, status: 'Job started', attempt: 1 };
vi.mock('../hooks/useFetchProgressData', () => ({
	useFetchProgressData: () => hookState,
}));

const renderBar = () =>
	render(
		<ProgressBar
			simulationId="sim-1"
			setAlertToggle={() => {}}
			setErrorId={() => {}}
		/>,
	);

describe('ProgressBar', () => {
	it('shows the plain status on the first attempt', () => {
		hookState.attempt = 1;
		renderBar();
		const text = screen.getByText(/Simulation status:/);
		expect(text).toHaveTextContent('Simulation status: Job started');
		expect(text).not.toHaveTextContent('attempt #');
	});

	it('appends the attempt number on a retry', () => {
		hookState.attempt = 2;
		renderBar();
		expect(screen.getByText(/Simulation status:/)).toHaveTextContent(
			'Simulation status: Job started (attempt #2)',
		);
	});
});
