import {
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from '@mui/material';
import { AxisNames } from '../constants/axisNames';

interface RadioInputProps {
	name: string;
	label: string;
	defaultValue: string;
}

export default function RadioInput({
	name,
	label,
	defaultValue,
}: RadioInputProps) {
	const availableAxisNames = Object.values(AxisNames);
	return (
		<FormControl
			sx={{ mb: 1, flexDirection: 'row', alignItems: 'center', gap: 1 }}
		>
			<FormLabel
				sx={{
					whiteSpace: 'nowrap',
					color: 'black',
					'&.Mui-focused': { color: 'black' },
				}}
			>
				{label}
			</FormLabel>
			<RadioGroup
				row
				name={name}
				defaultValue={defaultValue}
				key={`${name}-${defaultValue}`}
				sx={{ gap: 0.6, '& .MuiFormControlLabel-root': { mr: 1 } }}
			>
				{availableAxisNames.map((key) => (
					<FormControlLabel
						key={key}
						value={key}
						control={<Radio size="small" sx={{ p: 0.5, ml: 1 }} />}
						label={key}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}
