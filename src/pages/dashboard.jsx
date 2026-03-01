import { useEffect, useState } from "react";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { IoSyncCircle } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { ButtonDashboard } from "../components/ui/button";
import {
  BottomColumn,
  DBCard,
  LeftColumn,
  RightColumn,
} from "../components/ui/card";
import { AuthLayout } from "../layouts/auth";
import { axios_api_init } from "../lib/utils";

export const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [circulations, setCirculations] = useState([]);

  useEffect(() => {
    const getCount = async () => {
      // users
      const getUsers = await axios_api_init.get(`/api/users`, {
        method: "GET",
      });

      // roles
      const getRoles = await axios_api_init.get(`/api/roles`, {
        method: "GET",
      });

      // books
      const getBooks = await axios_api_init.get(`/api/books`, {
        method: "GET",
      });

      // members
      const getMembers = await axios_api_init.get(`/api/members`, {
        method: "GET",
      });

      // circulations
      const getCirculations = await axios_api_init.get(`/api/circulations`, {
        method: "GET",
      });

      setUsers(getUsers.data.data.length);
      setRoles(getRoles.data.data.length);
      setBooks(getBooks.data.data.length);
      setMembers(getMembers.data.data.length);
      setCirculations(getCirculations.data.data.length);
    };

    getCount();
  }, []);

  return (
    <AuthLayout>
      <div className="flex justify-center pb-4">
        <h1 className="font-semibold text-4xl">Dashboard Administrator</h1>
      </div>

      <div className="flex flex-wrap gap-y-4 gap-x-5 m-4 lg:m-2 md:m-2 md:snap-y md:snap-mandatory md:max-h-80 sm:overflow-y-scroll lg:overflow-y-hidden md:overflow-y-hidden xl:overflow-y-hidden sm:m-5 sm:snap-y sm:snap-mandatory sm:max-h-57">
        {/* 1 */}
        <DBCard className="bg-red-500 shadow-red-500/50">
          <LeftColumn>
            <p className="font-semibold">{books ? books : "?"}</p>
            <h1>Books</h1>
          </LeftColumn>
          <RightColumn>
            <GiBookshelf />
          </RightColumn>
          <BottomColumn className="bg-red-600 hover:bg-red-700">
            <ButtonDashboard to="/books" />
          </BottomColumn>
        </DBCard>
        {/* 2 */}
        <DBCard className="bg-yellow-500 shadow-yellow-500/50">
          <LeftColumn>
            <p className="font-semibold">{members ? members : "?"}</p>
            <h1>Members</h1>
          </LeftColumn>
          <RightColumn>
            <LuUsers />
          </RightColumn>
          <BottomColumn className="bg-yellow-600 hover:bg-yellow-700">
            <ButtonDashboard to="/members" />
          </BottomColumn>
        </DBCard>
        {/* 3 */}
        <DBCard className="bg-green-500 shadow-green-500/50">
          <LeftColumn>
            <p className="font-semibold">{circulations ? circulations : "?"}</p>
            <h1>Circulations</h1>
          </LeftColumn>
          <RightColumn>
            <IoSyncCircle />
          </RightColumn>
          <BottomColumn className="bg-green-600 hover:bg-green-700">
            <ButtonDashboard to="/circulations" />
          </BottomColumn>
        </DBCard>
        {/* 4 */}
        <DBCard className="bg-blue-500 shadow-blue-500/50">
          <LeftColumn>
            <p className="font-semibold">{users ? users : "?"}</p>
            <h1>Users</h1>
          </LeftColumn>
          <RightColumn>
            <FaUsers />
          </RightColumn>
          <BottomColumn className="bg-blue-600 hover:bg-blue-700">
            <ButtonDashboard to="/users" />
          </BottomColumn>
        </DBCard>
        {/* 5 */}
        <DBCard className="bg-purple-500 shadow-purple-500/50">
          <LeftColumn>
            <p className="font-semibold">{roles ? roles : "?"}</p>
            <h1>Roles</h1>
          </LeftColumn>
          <RightColumn>
            <FaUsersCog />
          </RightColumn>
          <BottomColumn className="bg-purple-600 hover:bg-purple-700">
            <ButtonDashboard to="/users" />
          </BottomColumn>
        </DBCard>
      </div>
    </AuthLayout>
  );
};
