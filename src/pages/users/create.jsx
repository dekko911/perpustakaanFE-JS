import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import {
	CheckboxPermissions,
	InputCreate,
	InputCreateFile,
} from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { SelectCreate } from "../../components/ui/select";
import { AuthLayout } from "../../layouts/auth";
import Loading from "/src/assets/images/loading.gif";
import axios from "axios";
import { api_token, api_url } from "../../lib/utils";

// dini nu benyah masih
export const CreateUserPage = () => {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		permissions: [],
	});
	const [isLoading, setIsLoading] = useState(false);

	const options = [
		"manage-users",
		"manage-books",
		"manage-members",
		"manage-circulations",
	];

	const handleCheckbox = (option) => {
		setForm((prev) => {
			const updated = prev.permissions.includes(option)
				? prev.permissions.filter((item) => item !== option)
				: [...prev.permissions, option];

			return { ...prev, permissions: updated };
		});
	};

	const handleCreate = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			const formData = new FormData();

			form.name && formData.append("name", form.name);
			form.email && formData.append("email", form.email);
			form.username && formData.append("username", form.username);
			form.password && formData.append("password", form.password);
			form.password_confirmation &&
				formData.append("password_confirmation", form.password_confirmation);
			form.role && formData.append("role", form.role);
			form.permissions &&
				form.permissions.forEach((arr) => {
					formData.append("permissions[]", arr);
				});
			form.avatar && formData.append("avatar", form.avatar);

			const res = await axios.post(`${api_url}/api/users`, formData, {
				headers: {
					Authorization: `Bearer ${api_token}`,
					"Content-Type": "application/json",
				},
				method: "post",
			});

			if (res.data) {
				navigate("/users");
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthLayout>
			<div className="p-2 overflow-y-scroll h-[74vh]">
				<form onSubmit={handleCreate} method="POST">
					<Label>Nama</Label>
					<InputCreate
						name="name"
						placeholder="Masukkan Nama Anda . . ."
						onKeyUp={(e) => {
							setForm((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>

					<Label>Email</Label>
					<InputCreate
						type="email"
						name="email"
						placeholder="Masukkan Email Anda . . ."
						onKeyUp={(e) => {
							setForm((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>

					<Label>Username</Label>
					<InputCreate
						name="username"
						placeholder="Masukkan Username Anda . . ."
						onKeyUp={(e) => {
							setForm((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>

					<Label>Password</Label>
					<InputCreate
						type="password"
						name="password"
						placeholder="********"
						onKeyUp={(e) => {
							setForm((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>

					<Label>Password Confirmation</Label>
					<InputCreate
						type="password"
						name="password_confirmation"
						placeholder="********"
						onKeyUp={(e) => {
							setForm((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					/>

					<Label>Role</Label>
					<SelectCreate
						name="role"
						onChange={(e) => {
							setForm((prev) => {
								return { ...prev, [e.target.name]: e.target.value };
							});
						}}
					>
						<option selected>Choose Role . . .</option>
						<option value="admin">Admin</option>
						<option value="staff">Staff</option>
					</SelectCreate>

					<Label>Permissions</Label>
					{options.map((option) => (
						<div key={option} className="">
							<CheckboxPermissions
								value={option}
								checked={form.permissions.includes(option)}
								onChange={() => handleCheckbox(option)}
							>
								{option}
							</CheckboxPermissions>
						</div>
					))}

					<Label>Avatar</Label>
					<InputCreateFile
						name="avatar"
						onChange={(e) => {
							setForm((prev) => {
								return { ...prev, [e.target.name]: e.target.files[0] };
							});
						}}
					/>

					<Button>
						{isLoading ? (
							<img src={Loading} alt="" className="w-5" />
						) : (
							<FaSave />
						)}
						Simpan
					</Button>
				</form>
			</div>
		</AuthLayout>
	);
};
