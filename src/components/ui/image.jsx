import { cn } from "../../lib/utils";

export const PhotoContainer = ({ className = "", imageSrc = "/src/assets/images/profile.png" }) => {
	return (
		<img
			src={imageSrc}
			alt="profile"
			className={cn(
				"w-12 rounded-[4cap] object-cover object-center",
				className
			)}
		/>
	);
};
