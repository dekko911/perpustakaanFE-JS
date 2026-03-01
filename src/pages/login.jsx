import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router";
import { ButtonLogin } from "../components/ui/button";
import { InputLogin } from "../components/ui/input";
import { LabelLogin } from "../components/ui/label";
import { GuestLayout } from "../layouts/guest";
import { swalToast } from "../lib/sweet-alert";
import { api_url } from "../lib/utils";
import Loading from "/src/assets/images/waiting-7579.gif";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const LoginPage = () => {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const newBody = JSON.stringify(formLogin);

      const res = await axios.post(`${api_url}/api/login`, newBody, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.data) {
        const token = res.data.token;

        Cookies.set("token", token);
        if (res.data.status && res.data.status === "OK") {
          window.location.href = "/dashboard";
        }
      }
    } catch (err) {
      console.error(err);
      if (err.status && err.status === 400) {
        swalToast("error", `${err.response.data.error}`, 280);
      }

      if (err.status && err.status === 422) {
        setValidationError(err.response.data.error);
      }

      if (err.response.data.exception === "Exception") {
        swalToast("error", `${err.response.data.message}`, 410);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GuestLayout className="relative">
      {isLoading && (
        <div className="bg-white/7 backdrop-blur-2xl py-[5vh] mx-auto z-20 absolute text-center rounded-2xl motion-preset-focus-sm">
          <img src={Loading} alt="loading" className="w-50" />
          <p className="font-bold text-xl text-shadow-2xs animate-pulse">
            Please Wait . . .
          </p>
        </div>
      )}
      <div className="p-10 w-120 z-10 motion-preset-focus-sm">
        <img
          src="/src/assets/images/bookshead.png"
          alt="logo"
          className="w-15 mx-auto mb-5"
        />
        <h1 className="text-center font-semibold text-xl mb-2">
          Log in to your account
        </h1>
        <p className="text-white/50 text-center mb-8 text-sm">
          Enter your email and password below to log in
        </p>
        <form onSubmit={handleLogin} method="post">
          <LabelLogin>Email address</LabelLogin>
          <InputLogin
            className={validationError.email ? "mb-2" : "mb-5"}
            name="email"
            id="email"
            type="text"
            placeholder="email@example.com"
            onKeyUp={(e) =>
              setFormLogin({ ...formLogin, email: e.target.value })
            }
          />
          {validationError.email && (
            <span className="text-red-500 block mb-3">
              {validationError.email}
            </span>
          )}

          <LabelLogin>Password</LabelLogin>
          <div className="relative">
            <InputLogin
              className={validationError.password ? "mb-1" : "mb-5"}
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              onKeyUp={(e) =>
                setFormLogin({ ...formLogin, password: e.target.value })
              }
            />

            <button
              type="button"
              className="absolute end-5 bottom-8 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>

            {validationError.password && (
              <span className="text-red-500 mb-5 block">
                {validationError.password}
              </span>
            )}
          </div>

          <ButtonLogin type="submit" disabled={isLoading}>
            Log in
          </ButtonLogin>
        </form>
        <h1 className="text-center mt-5 text-sm">
          Don't have an account?
          <Link
            to="/sign-up"
            className="underline underline-offset-2 ms-1.5 hover:text-white/70 duration-300"
          >
            Sign Up
          </Link>
        </h1>
      </div>
    </GuestLayout>
  );
};
