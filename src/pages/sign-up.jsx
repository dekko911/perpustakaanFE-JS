import { Link } from "react-router";
import { ButtonSignUp } from "../components/ui/button";
import { InputSignUp } from "../components/ui/input";
import { LabelSignUp } from "../components/ui/label";
import { GuestLayout } from "../layouts/guest";

export const SignUpPage = () => {
	return (
		<GuestLayout>
			<div className="py-5 px-10 z-10 w-120 motion-preset-focus-sm">
				<img
					src="/src/assets/images/bookshead.png"
					alt="logo"
					className="w-15 mx-auto mb-1"
				/>
				<h1 className="text-center font-semibold text-xl mb-2">
					Create an account
				</h1>
				<p className="text-white/50 mb-3 text-center text-sm">
					Enter your details below to create your account
				</p>
				<form>
					<LabelSignUp>Name</LabelSignUp>
					<InputSignUp type="name" name="name" placeholder="Full name" />

					<LabelSignUp>Email address</LabelSignUp>
					<InputSignUp
						type="email"
						name="email"
						placeholder="email@example.com"
					/>

					<LabelSignUp>Username</LabelSignUp>
					<InputSignUp
						type="text"
						name="username"
						placeholder="input your username. . ."
					/>

					<LabelSignUp>Password</LabelSignUp>
					<InputSignUp
						type="password"
						name="password"
						placeholder="*********"
					/>

					<LabelSignUp>Confirm Password</LabelSignUp>
					<InputSignUp
						type="password"
						name="password_confirmation"
						placeholder="*********"
					/>

					<ButtonSignUp className="mt-3">Create account</ButtonSignUp>
				</form>
				<h1 className="text-center mt-3 text-sm">
					Already have an account?
					<Link
						to="/"
						className="underline underline-offset-1 ms-1.5 hover:text-white/70 duration-300"
					>
						Log In
					</Link>
				</h1>
			</div>
		</GuestLayout>
	);
};
