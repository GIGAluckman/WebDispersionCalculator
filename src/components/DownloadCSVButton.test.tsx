import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadCSVButton from './DownloadCSVButton';

describe('DownloadCSVButton', () => {
	let capturedParts: BlobPart[] | null;
	let createObjectURL: ReturnType<typeof vi.fn>;
	let revokeObjectURL: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		capturedParts = null;
		// jsdom's Blob has no .text(); capture the constructor input instead
		const OriginalBlob = globalThis.Blob;
		class CapturingBlob extends OriginalBlob {
			constructor(parts?: BlobPart[], options?: BlobPropertyBag) {
				super(parts, options);
				capturedParts = parts ?? null;
			}
		}
		vi.stubGlobal('Blob', CapturingBlob);
		createObjectURL = vi.fn(() => 'blob:mock-url');
		revokeObjectURL = vi.fn();
		vi.stubGlobal('URL', {
			...URL,
			createObjectURL,
			revokeObjectURL,
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('downloads the columns as CSV and revokes the object URL', async () => {
		const data = {
			'k (rad/µm)': { '0': 0, '1': 2 },
			'f0 (GHz)': { '0': 5.1, '1': 6.2 },
		};
		render(<DownloadCSVButton data={data} />);
		await userEvent.click(
			screen.getByRole('button', { name: /download results csv/i }),
		);

		expect(createObjectURL).toHaveBeenCalledTimes(1);
		expect(capturedParts?.[0]).toBe('k (rad/µm),f0 (GHz)\n0,5.1\n2,6.2');
		expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
	});
});
