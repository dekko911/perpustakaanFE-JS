import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { cn } from "../../lib/utils";

// for table layout
export const Table = ({ children, className = "" }) => {
	return (
		<table className={cn("mt-6 table table-fixed", className)}>
			{children}
		</table>
	);
};

// table row <tr>
export const TableRow = ({ children }) => {
	return <tr>{children}</tr>;
};

// table head <thead>
export const TableHead = ({ children, className = "" }) => {
	return (
		<thead className={cn("border-b border-zinc-500/30", className)}>
			{children}
		</thead>
	);
};

// table cell for head <th>
export const THeadCell = ({ children, className = "" }) => {
	return (
		<th className={cn("p-2 border-r border-zinc-500/30", className)}>
			{children}
		</th>
	);
};

// table body <tbody>
export const TableBody = ({ children, className = "" }) => {
	return <tbody className={cn("text-center", className)}>{children}</tbody>;
};

// table cell for body <td>
export const TBodyCell = ({ children, className = "" }) => {
	return (
		<td className={cn("p-2 border-r border-b border-zinc-500/30", className)}>
			{children}
		</td>
	);
};

// table cell body <td>, but this for action column
export const TBodyCellAction = ({ to, onClick, className = "" }) => {
	const location = useLocation()

	return (
		<td
			className={cn(
				"py-7 border-b border-zinc-500/30 grid grid-cols-2 items-center justify-center",
				className
			)}
		>
			{location.pathname !== "/roles" &&
				<Link to={to} className="w-0">
					<FaEdit size={33} className="hover:text-green-500 hover:duration-200" />
				</Link>
			}
			<button onClick={onClick} className="cursor-pointer w-0">
				<AiFillDelete
					size={33}
					className="hover:text-red-500 hover:duration-200"
				/>
			</button>
		</td>
	);
};
