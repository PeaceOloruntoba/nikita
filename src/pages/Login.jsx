import React, { useState } from "react";
import { loginBg } from "../assets";
import { NavLink, useNavigate } from "react-router";
import Button from "../components/shared/Button";
import useAuthStore from "../store/useAuthStore";
import { toast } from "sonner";
import Spinner from "../components/shared/Spinner";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticating } = useAuthStore();

  const [user, setUser] = useState({ email: "", password: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await login(user, navigate);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <img
        src={loginBg}
        alt="Background"
        className="w-screen h-screen object-cover absolute"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur p-8 md:p-12 rounded-2xl shadow-xl flex flex-col w-full max-w-sm md:max-w-md gap-6">
          <span className="text-primary text-3xl font-bold text-center">
            Login
          </span>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              required
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="bg-white outline-none border p-3 rounded-xl"
              placeholder="Enter your email or username"
            />
            <input
              required
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="bg-white outline-none border p-3 rounded-xl"
              placeholder="Enter your password"
            />
            <div className="text-sm text-secondary font-semibold text-right">
              Don't have an account?{" "}
              <NavLink to="/signup" className="text-white">
                Sign Up
              </NavLink>
            </div>
            <Button
              value={isAuthenticating ? <Spinner /> : "Login"}
              className="bg-secondary rounded-xl text-white text-lg font-semibold py-2 hover:bg-primary cursor-pointer disabled:opacity-50"
              disabled={isAuthenticating}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
