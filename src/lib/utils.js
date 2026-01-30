import { clsx } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
	return twMerge(clsx(inputs));
};

export const parseTimestampToDateOnly = (timestamp) => {
	const date = new Date(timestamp)
	const options = { year: 'numeric', month: 'long', day: 'numeric' }

	return date.toLocaleDateString('id-ID', options)
}

// at api.
export const api_url = import.meta.env.VITE_API_BASE_URL;
export const api_storage_public = import.meta.env.VITE_API_URL_STORAGE_PUBLIC;
export const api_token = Cookies.get("token");
