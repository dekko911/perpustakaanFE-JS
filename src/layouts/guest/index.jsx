import { BackgroundBeams } from "../../components/ui/background-beams";
import { cn } from "../../lib/utils";

export const GuestLayout = ({ className = "", children }) => {
	return (
		<div
			className={cn(
				"flex items-center justify-center bg-linear-90 from-zinc-900 to-zinc-950 h-screen text-white font-montserrat",
				className
			)}
		>
			{children}
			<BackgroundBeams />
		</div>
	);
};
