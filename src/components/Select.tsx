import {
	FormControl,
	InputLabel,
	Select as MuiSelect,
	MenuItem,
} from '@mui/material';

interface SelectProps {
	name: string;
	allOptions: string[];
	defaultValue: string;
	setChosenOption: (option: any) => void;
	label: string;
}

export default function Select({
	name,
	allOptions,
	defaultValue,
	setChosenOption,
	label,
}: SelectProps) {
	return (
		<FormControl size="small" sx={{ mb: 1, minWidth: 160 }}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect
				name={name}
				defaultValue={defaultValue}
				label={label}
				onChange={(e) => setChosenOption(e.target.value)}
				key={`${name}-${defaultValue}`}
			>
				{allOptions.map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</MuiSelect>
		</FormControl>
	);
}
