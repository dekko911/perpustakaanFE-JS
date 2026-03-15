import { Link } from "react-router";
import { cn } from "../../lib/utils";

// this card profile
export const ProfileCard = ({ className = "", children }) => {
	return (
		<Link
			to={`/profile`}
			className={cn(
				"bg-zinc-500/50 w-50 py-3.5 px-3 grid grid-cols-3 items-center mb-2.5 mx-auto rounded-lg",
				className
			)}
		>
			{children}
		</Link>
	);
};

// the parent card container for DASHBOARD
export const DBCard = ({ children, className = "" }) => {
	return (
		<div
			className={cn(
				"grid grid-cols-2 p-3 xl:w-65 xl:h-37 lg:w-47 lg:h-25 rounded-md shadow-sm bg-zinc-600 shadow-zinc-600/50 md:w-50 sm:w-65",
				className
			)}
		>
			{children}
		</div>
	);
};

// for text column
export const LeftColumn = ({ children, className = "" }) => {
	return (
		<div className={cn("row-span-2 my-auto gap-y-1 grid", className)}>
			{children}
		</div>
	);
};

// for image/icon column
export const RightColumn = ({ children, className = "" }) => {
	return (
		<div
			className={cn(
				"row-span-2 grid items-center justify-end text-5xl mask-r-from-50% pe-1",
				className
			)}
		>
			{children}
		</div>
	);
};

// for button more info column
export const BottomColumn = ({ children, className = "" }) => {
	return (
		<div
			className={cn(
				"col-span-2 text-[15px] self-center lg:hidden md:hidden sm:hidden justify-center xl:flex font-semibold mx-16 rounded-sm",
				className
			)}
		>
			{children}
		</div>
	);
};
