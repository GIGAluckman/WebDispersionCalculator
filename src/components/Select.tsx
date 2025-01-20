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
		<label>
			{label}
			<select
				name={name}
				defaultValue={defaultValue}
				onChange={(e) => setChosenOption(e.target.value)}
				key={`${name}-${defaultValue}`}
				className="form-select"
			>
				{allOptions.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
}
