import { describe, it, expect } from 'vitest';
import { getErrorInfo, CONNECTION_ERROR } from './errorCodes';

describe('getErrorInfo', () => {
	it('maps 100 to a connection error and 99 to a server error', () => {
		// These were swapped between the poll hook and the Alert component before
		expect(getErrorInfo(CONNECTION_ERROR).message).toContain(
			'not responding',
		);
		expect(getErrorInfo(99).message).toContain('unexpected');
	});

	it('treats errorId 1 as a simulation warning, not a server error', () => {
		const info = getErrorInfo(1);
		expect(info.warning).toBe(true);
		expect(info.title).not.toContain('Server');
		expect(info.message).toContain('NaN');
	});

	it('describes relaxation failure for errorId 2', () => {
		expect(getErrorInfo(2).message).toContain('relax');
	});

	it('falls back to a generic message for unknown ids', () => {
		expect(getErrorInfo(42).message).toContain('42');
		expect(getErrorInfo(null).message).toBeTruthy();
	});
});
