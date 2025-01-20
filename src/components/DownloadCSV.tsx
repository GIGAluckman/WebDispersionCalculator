interface DownloadCSVProps {
	data: string;
}

export default function DownloadCSV({ data }: DownloadCSVProps) {
	const dataParsed = JSON.parse(data);
	const columnNames = Object.keys(dataParsed); // ["k (rad/m)", "f0 (GHz)", "f1 (GHz)", "f2 (GHz)"]
	const rows = Object.keys(dataParsed[columnNames[0]]).map((rowIndex) =>
		columnNames.map((column) => dataParsed[column][rowIndex])
	);

	const csvContent = [
		columnNames.join(','), // Header row
		...rows.map((row) => row.join(',')), // Data rows
	].join('\n');

	const downloadCSV = () => {
		const csvData = new Blob([csvContent], { type: 'text/csv' });
		const csvURL = URL.createObjectURL(csvData);
		const link = document.createElement('a');
		link.href = csvURL;
		link.download = 'dispersion.csv';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<button type="button" className="btn btn-success" onClick={downloadCSV}>
			Download Results
		</button>
	);
}
