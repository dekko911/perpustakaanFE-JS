import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaSyncAlt, FaUsers, FaUsersCog } from "react-icons/fa";
import { MdCardMembership, MdDashboard } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router";
import LogoBook from "../assets/images/bookshead.png";
import { swalToast } from "../lib/sweet-alert";
import { axios_api_init, cn } from "../lib/utils";
import { ButtonLogout } from "./ui/button";
import { ProfileCard } from "./ui/card";
import { PhotoContainer } from "./ui/image";
import DefaultProfile from "/src/assets/images/profile.png";

export const Sidebar = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({});
  const avatarAPI = `${user.r2_avatar_url}`;
  const avatar = avatarAPI !== "-" ? avatarAPI : DefaultProfile;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios_api_init.get(`/profile`, {
        method: "GET",
      });

      setUser(res.data.data);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const res = await axios_api_init.post(`/api/logout`, undefined, {
      method: "POST",
    });

    if (res.data.code === 200) {
      swalToast("success", `${res.data.message}`, 290);
      Cookies.remove("token", { path: "/" });
      navigate("/");
    }
  };

  return (
    <div
      className={cn(
        "w-[18rem] h-screen pt-4 ps-2 bg-transparent z-10 flex flex-col gap-y-1",
        className,
      )}
    >
      <Link
        to="/dashboard"
        className="flex items-center rounded-lg hover:bg-white/15 ms-2 me-3 py-1"
      >
        <img src={LogoBook} alt="logo" className="w-13" />
        <h1 className="font-bold text-xl text-shadow-2xs text-shadow-amber-800/40">
          Per<span className="text-amber-800">Pustakaan</span>
        </h1>
      </Link>

      <p className="px-2.5 translate-y-3 mb-1.5 text-sm font-semibold text-white/50">
        Platform
      </p>

      <div className="p-2 text-sm font-semibold xl:h-[61vh] lg:h-[61vh] md:h-[61vh] sm:h-[61vh] flex flex-col gap-y-1.5">
        <Link
          to="/dashboard"
          className={`flex items-center gap-x-2 py-1.5 px-2 rounded-md hover:bg-white/30 ${location.pathname === "/dashboard" && `bg-white/15`}`}
        >
          <MdDashboard className="w-5 h-5" />
          Dashboard
        </Link>

        <Link
          to="/users"
          className={`flex items-center gap-x-2 py-1.5 px-2 rounded-md hover:bg-white/30 ${location.pathname === "/users" && `bg-white/15`}`}
        >
          <FaUsers className="w-5 h-5" />
          Users
        </Link>

        <Link
          to="/roles"
          className={`flex items-center gap-x-2 py-1.5 px-2 rounded-md hover:bg-white/30 ${location.pathname === "/roles" && `bg-white/15`}`}
        >
          <FaUsersCog className="w-5 h-5" />
          Roles
        </Link>

        <Link
          to="/members"
          className={`flex items-center gap-x-2 py-1.5 px-2 rounded-md hover:bg-white/30 ${location.pathname === "/members" && `bg-white/15`}`}
        >
          <MdCardMembership />
          Members
        </Link>

        <Link
          to="/books"
          className={`flex items-center gap-x-2 py-1.5 px-2 rounded-md hover:bg-white/30 ${location.pathname === "/books" && `bg-white/15`}`}
        >
          <SiBookstack className="w-5 h-5" />
          Books
        </Link>

        <Link
          to="/circulations"
          className={`flex items-center gap-x-2 py-1.5 px-2 rounded-md hover:bg-white/30 ${location.pathname === "/circulations" && `bg-white/15`}`}
        >
          <FaSyncAlt className="w-5 h-5" />
          Circulations
        </Link>
      </div>

      <ProfileCard
        className={location.pathname === `/profile/${user.id}` && "bg-white/15"}
      >
        <PhotoContainer imageSrc={avatar} />
        <div className="col-span-2">
          <p className="text-md">{user.name ? user.name : "Who Are You?"}</p>
          <p className="text-xs">
            {user.email ? user.email : "What's ur Email?"}
          </p>
        </div>
      </ProfileCard>

      <ButtonLogout onClick={handleLogout} />
    </div>
  );
};
