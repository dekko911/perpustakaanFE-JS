import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import { InputSearch } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TBodyCell,
  TBodyCellAction,
  THeadCell,
} from "../../components/ui/table";
import { AuthLayout } from "../../layouts/auth";
import { swalDialogConfirmForRoles, swalToast } from "../../lib/sweet-alert";
import { axios_api_init } from "../../lib/utils";
import Loading from "/src/assets/images/pyramid-19507.gif";

export const RolesPage = () => {
  const [users, setUsers] = useState([]);
  const [isSearch, setIsSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios_api_init.get(`/api/users?page=1`, {
        method: "GET",
      });

      setUsers(res.data.data);

      setIsLoading(false);
    };

    fetchUsers();
  }, [isSearch]);

  const handleDelete = async (userID) => {
    try {
      const user = await axios_api_init.get(`/api/role/user/${userID}`, {
        method: "GET",
      });

      const role = {
        key: user.data.data.role?.id,
        value: user.data.data.role?.name,
      };

      const options = {};

      role?.key.forEach((id, i) => {
        options[id] = role?.value[i];
      });

      swalDialogConfirmForRoles(
        "Disconnect User & Role",
        "Are You Sure?",
        "info",
        options,
      ).then(async (equals) => {
        if (equals.isConfirmed) {
          const res = await axios_api_init.delete(
            `/api/user/${userID}/role/${equals.value}`,
            {
              method: "DELETE",
            },
          );

          if (res.data) {
            swalToast("success", "Successful Deleted!", 280);

            // TODO: coba cek lagi nanti di sini
            setUsers((prev) =>
              prev
                .filter((user) => user.id !== userID)
                .roles?.filter((role) => role.id !== equals.value),
            );
          }
        }
      });
    } catch (err) {
      // console.error(err);
      if (err.status && err.status === 500)
        swalToast("error", `${err.response.data.error}`, 250);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col relative">
        {isLoading && (
          <img
            src={Loading}
            alt="loading..."
            className="absolute w-100 top-28 left-90"
          />
        )}

        <div className="flex">
          <h1 className="font-semibold text-2xl me-0.5">Roles Page</h1>
          <Link to="/roles/create" className="w-0">
            <FaPlus className="hover:text-amber-600 cursor-pointer hover:duration-200" />
          </Link>

          <InputSearch
            onChange={(e) => {
              setIsSearch(e.target.value);
            }}
            placeholder="Search Role . . ."
            className="ms-auto"
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <THeadCell>No.</THeadCell>
              <THeadCell>Username</THeadCell>
              <THeadCell>Roles</THeadCell>
              <THeadCell className="border-none">Action</THeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={i}>
                <TBodyCell>{i + 1}</TBodyCell>
                <TBodyCell>{user.name}</TBodyCell>
                <TBodyCell>
                  {user.roles !== null
                    ? user.roles?.map((role) => role.name).join(", ")
                    : "-"}
                </TBodyCell>
                <TBodyCellAction
                  onClick={() => {
                    handleDelete(user.id);
                  }}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AuthLayout>
  );
};
