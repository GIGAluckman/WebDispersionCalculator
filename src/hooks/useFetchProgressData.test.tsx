import {
	describe,
	it,
	expect,
	vi,
	beforeEach,
	afterEach,
	type Mock,
} from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFetchProgressData } from './useFetchProgressData';
import { SimulationResultData } from '../constants/experimentTypes';

const INITIAL_DELAY = 3000;
const TICK = 2000;

const advance = (ms: number) =>
	act(async () => {
		await vi.advanceTimersByTimeAsync(ms);
	});

type MockResponse = {
	ok: boolean;
	status: number;
	json: () => Promise<unknown>;
};

const jsonResponse = (body: unknown, status = 200): MockResponse => ({
	ok: status >= 200 && status < 300,
	status,
	json: async () => body,
});

const statusBody = (over: Record<string, unknown> = {}) => ({
	status: 'Job started',
	progress: 0.5,
	error: 0,
	completed: false,
	...over,
});

const resultBody = {
	dispersion: { 'k (rad/µm)': { '0': 0, '1': 2 } },
	errorId: 0,
	numberOfModes: 3,
};

describe('useFetchProgressData', () => {
	let statusQueue: Array<MockResponse | Error>;
	let resultQueue: Array<MockResponse | Error>;
	let fetchMock: Mock<(url: string) => Promise<MockResponse>>;
	let setAlertToggle: Mock<(input: boolean) => void>;
	let setErrorId: Mock<(input: number | null) => void>;
	let setResult: Mock<(result: SimulationResultData) => void>;
	let setLoading: Mock<(loading: boolean) => void>;

	beforeEach(() => {
		vi.useFakeTimers();
		vi.stubEnv('VITE_BACKEND_URL', 'http://test-backend');
		statusQueue = [];
		resultQueue = [];
		fetchMock = vi.fn((url: string) => {
			const queue = url.includes('/result/') ? resultQueue : statusQueue;
			const next = queue.shift();
			if (next === undefined) {
				return Promise.reject(new Error(`unexpected fetch: ${url}`));
			}
			if (next instanceof Error) {
				return Promise.reject(next);
			}
			return Promise.resolve(next);
		});
		vi.stubGlobal('fetch', fetchMock);
		setAlertToggle = vi.fn();
		setErrorId = vi.fn();
		setResult = vi.fn();
		setLoading = vi.fn();
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.unstubAllEnvs();
		vi.useRealTimers();
	});

	const render = () =>
		renderHook(() =>
			useFetchProgressData(
				'http://test-backend/status/sim-1',
				setAlertToggle,
				setErrorId,
				setResult,
				setLoading,
				'sim-1',
			),
		);

	it('polls status and fetches the result once completed', async () => {
		statusQueue.push(
			jsonResponse(statusBody()),
			jsonResponse(statusBody({ completed: true, progress: 1 })),
		);
		resultQueue.push(jsonResponse(resultBody));

		const { result } = render();
		await advance(INITIAL_DELAY + TICK);
		expect(result.current.progress).toBe(0.5);
		expect(setResult).not.toHaveBeenCalled();

		await advance(TICK);
		expect(setResult).toHaveBeenCalledWith({
			dispersion: resultBody.dispersion,
			numberOfModes: 3,
		});
		expect(setErrorId).toHaveBeenCalledWith(0);
		expect(setAlertToggle).not.toHaveBeenCalled();
		expect(setLoading).toHaveBeenCalledWith(false);

		// polling stopped: no further requests on later ticks
		const calls = fetchMock.mock.calls.length;
		await advance(TICK * 3);
		expect(fetchMock.mock.calls.length).toBe(calls);
	});

	it('keeps polling when the result is 202 and fetches it on a later tick', async () => {
		statusQueue.push(
			jsonResponse(statusBody({ completed: true })),
			jsonResponse(statusBody({ completed: true })),
		);
		resultQueue.push(
			jsonResponse({ error: 'not yet', errorId: 0 }, 202),
			jsonResponse(resultBody),
		);

		const { unmount } = render();
		await advance(INITIAL_DELAY + TICK);
		// first attempt: result not ready — must not give up, must not error
		expect(setResult).not.toHaveBeenCalled();
		expect(setAlertToggle).not.toHaveBeenCalled();

		await advance(TICK);
		expect(setResult).toHaveBeenCalledTimes(1);
		unmount();
	});

	it('fails with the job error code when a failed job has no result file', async () => {
		// relaxation failure: error=2, completed, but a result file never appears
		statusQueue.push(
			jsonResponse(statusBody({ completed: true, error: 2 })),
		);
		resultQueue.push(jsonResponse({ error: 'not yet', errorId: 0 }, 202));

		render();
		await advance(INITIAL_DELAY + TICK);
		expect(setErrorId).toHaveBeenCalledWith(2);
		expect(setAlertToggle).toHaveBeenCalledWith(true);
		expect(setLoading).toHaveBeenCalledWith(false);
		expect(setResult).not.toHaveBeenCalled();

		// polling stopped
		const calls = fetchMock.mock.calls.length;
		await advance(TICK * 3);
		expect(fetchMock.mock.calls.length).toBe(calls);
	});

	it('shows a NaN warning result (errorId 1) with the partial data', async () => {
		statusQueue.push(
			jsonResponse(statusBody({ completed: true, error: 1 })),
		);
		resultQueue.push(jsonResponse({ ...resultBody, errorId: 1 }));

		render();
		await advance(INITIAL_DELAY + TICK);
		expect(setResult).toHaveBeenCalledTimes(1);
		expect(setErrorId).toHaveBeenCalledWith(1);
		expect(setAlertToggle).toHaveBeenCalledWith(true);
	});

	it('tolerates up to three consecutive poll failures', async () => {
		statusQueue.push(
			new Error('boom'),
			new Error('boom'),
			new Error('boom'),
			jsonResponse(statusBody()),
		);

		render();
		await advance(INITIAL_DELAY + TICK * 4);
		expect(setAlertToggle).not.toHaveBeenCalled();
		expect(setErrorId).not.toHaveBeenCalled();
	});

	it('gives up after four consecutive poll failures with a connection error', async () => {
		statusQueue.push(
			new Error('boom'),
			new Error('boom'),
			new Error('boom'),
			new Error('boom'),
		);

		render();
		await advance(INITIAL_DELAY + TICK * 4);
		expect(setErrorId).toHaveBeenCalledWith(100);
		expect(setAlertToggle).toHaveBeenCalledWith(true);
		expect(setLoading).toHaveBeenCalledWith(false);
	});

	it('treats a non-ok status response as a failure, not a crash', async () => {
		statusQueue.push(
			jsonResponse('<html>Bad Gateway</html>', 502),
			jsonResponse(statusBody()),
		);

		render();
		await advance(INITIAL_DELAY + TICK * 2);
		expect(setAlertToggle).not.toHaveBeenCalled();
	});

	it('does not stack overlapping requests when a response is slow', async () => {
		let resolveSlow: (value: MockResponse) => void;
		const slow = new Promise<MockResponse>((resolve) => {
			resolveSlow = resolve;
		});
		fetchMock.mockImplementation(() => slow);

		render();
		// one request goes out, then three more ticks elapse while it hangs
		await advance(INITIAL_DELAY + TICK * 4);
		expect(fetchMock).toHaveBeenCalledTimes(1);

		resolveSlow!(jsonResponse(statusBody()));
		await advance(TICK);
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});

	it('stops polling on unmount', async () => {
		statusQueue.push(jsonResponse(statusBody()));
		const { unmount } = render();
		await advance(INITIAL_DELAY + TICK);
		const calls = fetchMock.mock.calls.length;
		unmount();
		await advance(TICK * 5);
		expect(fetchMock.mock.calls.length).toBe(calls);
	});
});
