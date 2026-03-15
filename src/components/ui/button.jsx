import { FiExternalLink } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router";
import { cn } from "../../lib/utils";

export const ButtonLogin = ({
  type = "submit",
  className,
  disabled = false,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "w-full bg-white text-black py-2 rounded-md text-base font-semibold mt-5 hover:bg-white/80 cursor-pointer hover:text-black/80",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonSignUp = ({
  type = "submit",
  className = "",
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        "w-full bg-white text-black py-2 rounded-md font-semibold mt-5 hover:bg-white/80 cursor-pointer hover:text-black/80 text-sm",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonLogout = ({ className = "", onClick, ...props }) => {
  return (
    <button
      className={cn(
        "cursor-pointer text-start mx-auto font-semibold flex items-center gap-x-2 py-1.5 px-3.5 rounded-lg bg-zinc-500/50 w-50 hover:bg-zinc-500/80",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <MdLogout />
      Log Out
      {/* bagaimana membuat pengkondisian jika element ini di HOVER ? */}
    </button>
  );
};

export const Button = ({ className = "", disabled = false, children }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "cursor-pointer bg-white text-black p-2 rounded-md mt-5 flex items-center gap-x-1.5",
        className,
      )}
    >
      {children}
    </button>
  );
};

// this button for DASHBOARD, and it's an static; So no children
export const ButtonDashboard = ({ to, className = "" }) => {
  return (
    <Link to={to} className={cn("flex items-center gap-x-1", className)}>
      More Info
      <FiExternalLink />
    </Link>
  );
};

export const ButtonProfile = ({
  className = "",
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      className={cn("border h-10 px-3 rounded-lg cursor-pointer", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
