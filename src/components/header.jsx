import {
  FaSyncAlt,
  FaUser,
  FaUserCog,
  FaUserPlus,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import { MdCardMembership, MdDashboard } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { useLocation } from "react-router";
import { api_token, api_url, cn } from "../lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";

export const Header = ({ className = "" }) => {
  const location = useLocation();

  const [userRole, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${api_url}/profile`, {
        headers: {
          Authorization: `Bearer ${api_token}`,
          "Content-Type": "application/json",
        },
        method: "get",
      });

      setUser(res.data.data.roles.map((role) => role.name));
    };

    fetchUser();
  }, []);

  return (
    <header
      className={cn(
        "w-full bg-transparent z-10 py-4 px-5 text-white flex justify-between",
        className,
        location.pathname === "/profile" && "hidden"
      )}
    >
      <div className="flex items-center gap-x-1.5 text-lg">
        {/* path url logo */}
        {(location.pathname === "/dashboard" && <MdDashboard />) ||
          (location.pathname === "/users" && <FaUsers />) ||
          (location.pathname === "/roles" && <FaUsersCog />) ||
          (location.pathname === "/books" && <SiBookstack />) ||
          (location.pathname === "/circulations" && <FaSyncAlt />) ||
          (location.pathname === "/members" && <MdCardMembership />) ||
          (location.pathname === "/users/create" && <FaUserPlus />)}

        {/* path url name */}
        <h1 className="font-semibold inline-flex items-center">
          {(location.pathname === "/dashboard" && "Dashboard") ||
            (location.pathname === "/users" && "Users") ||
            (location.pathname === "/roles" && "Roles") ||
            (location.pathname === "/books" && "Books") ||
            (location.pathname === "/circulations" && "Circulations") ||
            (location.pathname === "/members" && "Members") ||
            (location.pathname === "/users/create" && "Create User Page")}
        </h1>
      </div>

      <h1
        className={`flex items-center gap-x-1 text-sm pe-3 ${location.pathname === "/profile" && "hidden"}`}
      >
        <FaUser /> {userRole ? userRole : "?"}
      </h1>
    </header>
  );
};
