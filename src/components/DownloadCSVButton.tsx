import { DispersionData } from '../constants/experimentTypes';

interface DownloadCSVButtonProps {
	data: DispersionData;
}

const downloadCSV = (csvContent: string) => {
	const csvData = new Blob([csvContent], { type: 'text/csv' });
	const csvURL = URL.createObjectURL(csvData);
	const link = document.createElement('a');
	link.href = csvURL;
	link.download = 'dispersion.csv';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export default function DownloadCSVButton({ data }: DownloadCSVButtonProps) {
	const columnNames = Object.keys(data);
	const rows = Object.keys(data[columnNames[0]]).map((rowIndex) =>
		columnNames.map((column) => data[column][rowIndex])
	);

	const csvContent = [
		columnNames.join(','), // Header row
		...rows.map((row) => row.join(',')), // Data rows
	].join('\n');

	return (
		<button
			type="button"
			className="btn btn-success"
			onClick={() => downloadCSV(csvContent)}
		>
			Download Results CSV
		</button>
	);
}
