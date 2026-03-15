import axios from "axios";
import { clsx } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const parseTimestampToDateOnly = (timestamp) => {
  const date = new Date(timestamp);
  const options = { year: "numeric", month: "long", day: "numeric" };

  return date.toLocaleDateString("id-ID", options);
};

export const api_token = Cookies.get("token");

const vite_env = import.meta.env.VITE_ENV;

export let api_url;

switch (vite_env) {
  case "production":
    api_url = import.meta.env.VITE_API_PRODUCTION_BASE_URL;
    break;

  case "development":
    api_url = import.meta.env.VITE_API_LOCAL_BASE_URL;
    break;

  default:
    console.error("YOUR VITE_ENV IS EMPTY");
}

export const axios_api_init = axios.create({
  baseURL: api_url,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${api_token}`,
    "Content-Type": "application/json",
  },
});
