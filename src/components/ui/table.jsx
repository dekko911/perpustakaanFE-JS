import { AiFillDelete } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight, FaEdit } from "react-icons/fa";
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
	const location = useLocation();

	return (
		<td
			className={cn(
				"py-7 border-b border-zinc-500/30 grid grid-cols-2 items-center justify-center",
				className,
			)}
		>
			{location.pathname !== "/roles" && (
				<Link to={to} className="w-0">
					<FaEdit
						size={33}
						className="hover:text-green-500 hover:duration-200"
					/>
				</Link>
			)}
			<button onClick={onClick} className="cursor-pointer w-0">
				<AiFillDelete
					size={33}
					className="hover:text-red-500 hover:duration-200"
				/>
			</button>
		</td>
	);
};

export const TablePagination = ({
	handlePrev,
	handleNext,
	pageIndex,
	setPageIndex,
	lastPage,
	totalData,
}) => {
	return (
		<div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
			<div className="flex flex-1 justify-between sm:hidden">
				<button
					onClick={handlePrev}
					disabled={pageIndex === 1}
					className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
				>
					Previous
				</button>

				<button
					onClick={handleNext}
					disabled={pageIndex === lastPage}
					className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
				>
					Next
				</button>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-300">
						Showing <span className="font-medium">{pageIndex}</span> to{" "}
						<span className="font-medium">{lastPage}</span> of{" "}
						<span className="font-medium">{totalData}</span> results
					</p>
				</div>
				<div>
					<nav
						aria-label="Pagination"
						className="isolate inline-flex -space-x-px rounded-md"
					>
						<button
							onClick={handlePrev}
							disabled={pageIndex === 1}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 cursor-pointer"
						>
							<span className="sr-only">Previous</span>
							<FaChevronLeft aria-hidden="true" className="size-5" />
						</button>

						{Array.from({ length: lastPage }).map((_, i) => {
							const fixPage = i + 1;

							return (
								<button
									key={fixPage}
									onClick={() => setPageIndex(fixPage)}
									aria-current="page"
									className={cn(
										"cursor-pointer",
										pageIndex === fixPage
											? "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer bg-indigo-500 text-white"
											: "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0",
									)}
								>
									{fixPage}
								</button>
							);
						})}

						<button
							onClick={handleNext}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 cursor-pointer"
							disabled={pageIndex === lastPage}
						>
							<span className="sr-only">Next</span>
							<FaChevronRight aria-hidden="true" className="size-5" />
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
};
