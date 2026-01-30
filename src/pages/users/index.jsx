import axios from "axios";
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
import { AuthLayout } from "../../layouts/auth/index";
import { swalDialogConfirm, swalToast } from "../../lib/sweet-alert";
import { api_storage_public, api_token, api_url } from "../../lib/utils";
import Loading from "/src/assets/images/pyramid-19507.gif";

export const UsersPage = () => {
	const [users, setUsers] = useState([]);
	const [isSearch, setIsSearch] = useState("");
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await axios.get(`${api_url}/api/users`, {
				headers: {
					Authorization: `Bearer ${api_token}`,
					"Content-Type": "application/json",
				},
				method: "get",
			});

			setUsers(res.data.data);
			setIsLoading(false);
		};

		fetchUsers();
	}, [isSearch]);

	const handleDelete = (id) => {
		swalDialogConfirm(
			"Deleting User",
			"Are You Sure Delete This User?",
			"info"
		).then(async (equals) => {
			try {
				if (equals.isConfirmed) {
					const res = await axios.delete(`${api_url}/api/users/${id}`, {
						headers: {
							Authorization: `Bearer ${api_token}`,
							"Content-Type": "application/json",
						},
						method: "delete",
					});

					if (res.data) {
						swalToast("success", "Successful Deleted!", 280);
						setUsers((prev) => prev.filter((user) => user.id !== id));
					}
				}
			} catch (err) {
				// console.error(err);
				if (err.response.data.code === 403) {
					swalToast("error", `${err.response.data.error}`, 335);
				}
			}
		});
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
					<h1 className="font-semibold text-2xl me-0.5">Users Page</h1>
					<Link to="/users/create" className="w-0">
						<FaPlus className="hover:text-amber-600 cursor-pointer hover:duration-200" />
					</Link>

					<InputSearch
						onChange={(e) => {
							setIsSearch(e.target.value);
						}}
						placeholder="Search User . . ."
						className="ms-auto"
					/>
				</div>

				<Table>
					<TableHead>
						<TableRow>
							<THeadCell>No.</THeadCell>
							<THeadCell>Name</THeadCell>
							<THeadCell>Email</THeadCell>
							<THeadCell>Roles</THeadCell>
							<THeadCell>Avatar</THeadCell>
							<THeadCell className="border-none">Action</THeadCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user, i) => (
							<TableRow key={i}>
								<TBodyCell>{i + 1}</TBodyCell>
								<TBodyCell>{user.name}</TBodyCell>
								<TBodyCell>{user.email}</TBodyCell>
								<TBodyCell>{user.roles !== null ? user.roles?.map((role) => (role.name)).join(", ") : "-"}</TBodyCell>
								<TBodyCell>
									<img
										src={`${api_storage_public}/images/profile/${user.avatar}`}
										alt="avatar"
										className="w-18 rounded-[4cap] object-cover object-center mx-auto"
									/>
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
