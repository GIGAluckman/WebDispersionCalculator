import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Without vitest globals, testing-library cannot self-register its cleanup —
// stale components would keep running effects (e.g. polling intervals) into
// later tests.
afterEach(() => {
	cleanup();
});
