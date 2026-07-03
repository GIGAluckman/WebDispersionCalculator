import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from './Alert';

describe('Alert', () => {
	it('renders nothing when hidden or without an error id', () => {
		const { container } = render(
			<Alert show={false} errorId={99} onClose={() => {}} />,
		);
		expect(container).toBeEmptyDOMElement();
		const { container: c2 } = render(
			<Alert show={true} errorId={null} onClose={() => {}} />,
		);
		expect(c2).toBeEmptyDOMElement();
	});

	it('announces the error with role=alert and the mapped message', () => {
		render(<Alert show={true} errorId={100} onClose={() => {}} />);
		const alert = screen.getByRole('alert');
		expect(alert).toHaveTextContent('Server is not responding');
		expect(alert).toHaveTextContent('Connection error');
	});

	it('shows a fallback message for unknown error ids', () => {
		render(<Alert show={true} errorId={1234} onClose={() => {}} />);
		expect(screen.getByRole('alert')).toHaveTextContent('1234');
	});

	it('calls onClose when the close button is clicked', async () => {
		const onClose = vi.fn();
		render(<Alert show={true} errorId={99} onClose={onClose} />);
		await userEvent.click(screen.getByRole('button', { name: /close/i }));
		expect(onClose).toHaveBeenCalled();
	});
});
