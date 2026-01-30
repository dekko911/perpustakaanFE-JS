import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
import { cn } from "../lib/utils";

export const Footer = ({ className = "" }) => {
	return (
		<footer
			className={cn(
				"bg-transparent py-2 px-4 flex justify-between text-white/80",
				className
			)}
		>
			<h1 className="text-sm">&#xA9; 2025 Miko Suyasa, All Rights Reserved.</h1>

			<div className="flex items-center gap-x-5 text-lg pe-3 text-white/50">
				<Link
					to="https://www.facebook.com/dekmico.exactly"
					target="_blank"
					className="hover:text-white duration-300"
				>
					<FaFacebook />
				</Link>
				<Link
					to="https://youtube.com/@dekkmikoo?si=vc-KtAU13Agwz33q"
					target="_blank"
					className="hover:text-white duration-300"
				>
					<FaYoutube />
				</Link>
				<Link
					to="https://www.instagram.com/dekkmikoo/"
					target="_blank"
					className="hover:text-white duration-300"
				>
					<FaInstagram />
				</Link>
				<Link
					to="https://github.com/dekko911"
					target="_blank"
					className="hover:text-white duration-300"
				>
					<FaGithub />
				</Link>
			</div>
		</footer>
	);
};
