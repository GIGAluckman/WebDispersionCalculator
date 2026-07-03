import {
	FormControl,
	InputLabel,
	Select as MuiSelect,
	MenuItem,
} from '@mui/material';

interface SelectProps<T extends string> {
	name: string;
	allOptions: T[];
	defaultValue: T;
	setChosenOption: (option: T) => void;
	label: string;
}

export default function Select<T extends string>({
	name,
	allOptions,
	defaultValue,
	setChosenOption,
	label,
}: SelectProps<T>) {
	return (
		<FormControl size="small" sx={{ mb: 1, minWidth: 160 }}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect
				name={name}
				defaultValue={defaultValue}
				label={label}
				onChange={(e) => setChosenOption(e.target.value as T)}
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
