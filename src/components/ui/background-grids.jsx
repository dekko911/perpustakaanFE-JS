import { cn } from "../../lib/utils";

export const BackgroundGrids = ({ children, className = "" }) => {
	return (
		<div className={cn("relative h-screen w-full font-montserrat", className)}>
			<div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
			{children}
		</div>
	);
};
