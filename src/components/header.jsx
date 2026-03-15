import { useEffect, useState } from "react";
import {
  FaSyncAlt,
  FaUser,
  FaUserEdit,
  FaUserPlus,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";
import { MdCardMembership, MdDashboard } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { useLocation, useParams } from "react-router";
import { axios_api_init, cn } from "../lib/utils";

export const Header = ({ className = "" }) => {
  const location = useLocation();
  const params = useParams();

  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios_api_init.get(`/profile`, {
        method: "GET",
      });

      setUserRole(res.data.data.roles.map((role) => role.name));

      if (location.pathname === `/users/${params.id}`) {
        const resUserID = await axios_api_init.get(`/api/user/${params.id}`, {
          method: "GET",
        });

        setUsername(resUserID.data.data.name);
      }
    };

    fetchUser();
  }, [location.pathname, params.id]);

  return (
    <header
      className={cn(
        "w-full bg-transparent z-10 py-4 px-5 text-white flex justify-between",
        className,
        location.pathname === "/profile" && "hidden",
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
          (location.pathname === "/users/create" && <FaUserPlus />) ||
          (location.pathname === `/users/${params.id}` && <FaUserEdit />)}

        {/* path url name */}
        <h1 className="font-semibold inline-flex items-center">
          {(location.pathname === "/dashboard" && "Dashboard") ||
            (location.pathname === "/users" && "Users") ||
            (location.pathname === "/roles" && "Roles") ||
            (location.pathname === "/books" && "Books") ||
            (location.pathname === "/circulations" && "Circulations") ||
            (location.pathname === "/members" && "Members") ||
            (location.pathname === "/users/create" && "Create User Page") ||
            (location.pathname === `/users/${params.id}` &&
              `Edit User Page (${username})`)}
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
