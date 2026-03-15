import { cn } from "../../lib/utils";

export const SelectCreate = ({
	name = "",
	value,
	className = "",
	onChange,
	children,
}) => {
	return (
		<select
			name={name}
			value={value}
			className={cn(
				"w-full p-2 bg-black border-1 border-zinc-500 focus:outline-1 focus:outline-zinc-400/20 rounded-md mt-1 mb-2.5",
				className
			)}
			onChange={onChange}
		>
			{children}
		</select>
	);
};
