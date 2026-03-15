import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import { InputSearch } from "../../components/ui/input";
import {
	Table,
	TableBody,
	TableHead,
	TablePagination,
	TableRow,
	TBodyCell,
	TBodyCellAction,
	THeadCell,
} from "../../components/ui/table";
import { AuthLayout } from "../../layouts/auth/index";
import { swalDialogConfirm, swalToast } from "../../lib/sweet-alert";
import { axios_api_init } from "../../lib/utils";
import Loading from "/src/assets/images/pyramid-19507.gif";

export const UsersPage = () => {
	const [users, setUsers] = useState([]);
	const [lastPage, setLastPage] = useState(1);
	const [total, setTotal] = useState(null);
	const [isSearch, setIsSearch] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [pageIndex, setPageIndex] = useState(1);

	if (pageIndex < 1) setPageIndex(1);

	const handleNext = () => {
		setPageIndex((prev) => prev + 1);
	};

	const handlePrev = () => {
		setPageIndex((prev) => Math.max(prev - 1, 1));
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await axios_api_init.get(`/api/users?page=${pageIndex}`, {
				method: "GET",
			});

			setTotal(res.data.total_data);
			setLastPage(res.data.last_page);
			setUsers(res.data.data);
			setIsLoading(false);
		};

		const fetchData = async () => {
			const res = await axios_api_init.get(
				`/search/users?search_u=${isSearch}`,
				{
					method: "GET",
				},
			);

			setUsers(res.data.data.hits);
		};

		fetchUsers();

		if (isSearch) {
			fetchData();
		}
	}, [isSearch, pageIndex]);

	const handleDelete = (id) => {
		swalDialogConfirm(
			"Deleting User",
			"Are You Sure Delete This User?",
			"info",
		).then(async (equals) => {
			try {
				if (equals.isConfirmed) {
					const res = await axios_api_init.delete(`/api/user/${id}`, {
						method: "DELETE",
					});

					if (res.data) {
						swalToast("success", "Successful Deleted!", 280);
						setUsers((prev) => prev.filter((user) => user.id !== id));
					}
				}
			} catch (err) {
				// console.error(err);
				if (err.response.data.code === 403) {
					swalToast("error", `${err.response.data.error}`, 305);
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
						onKeyUp={(e) => {
							setIsSearch(e.target.value);
						}}
						placeholder="Search User . . ."
						className="ms-auto"
					/>
				</div>

				<Table className="m-0 mt-6">
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
								<TBodyCell>{(pageIndex - 1) * 10 + i + 1}</TBodyCell>
								<TBodyCell>{user.name}</TBodyCell>
								<TBodyCell>{user.email}</TBodyCell>
								<TBodyCell>
									{user.roles !== null
										? user.roles?.map((role) => role.name).join(", ")
										: "-"}
								</TBodyCell>
								<TBodyCell>
									<img
										src={`${user.r2_avatar_url}`}
										alt="avatar"
										className="size-18 rounded-[4cap] object-cover object-center mx-auto"
									/>
								</TBodyCell>
								<TBodyCellAction
									to={`/users/${user.id}`}
									onClick={() => {
										handleDelete(user.id);
									}}
								/>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<TablePagination
					handlePrev={handlePrev}
					handleNext={handleNext}
					pageIndex={pageIndex}
					setPageIndex={setPageIndex}
					lastPage={lastPage}
					totalData={total}
				/>
			</div>
		</AuthLayout>
	);
};
