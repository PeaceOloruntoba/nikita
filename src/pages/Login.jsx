import React, { useState } from "react";
import { loginBg } from "../assets";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import { toast } from "sonner";
import useAuthStore from "../store/useAuthStore";
import Spinner from "../components/shared/Spinner";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticating } = useAuthStore((state) => ({
    login: state.login,
    isAuthenticating: state.isAuthenticating,
  }));

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("Please enter both email and password!");
      return;
    }
    login(user, navigate);
  }

  return (
    <div className="w-screen h-screen relative">
      <img src={loginBg} alt="" className="w-screen h-screen object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur p-12 rounded-2xl shadow-xl flex flex-col w-1/3 gap-6">
          <span className="text-primary text-3xl font-bold w-full text-center">
            Login
          </span>
          <form className="flex flex-col gap-8" onSubmit={handleLogin}>
            <input
              required
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              placeholder="Enter your email or username here"
            />
            <input
              required
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              placeholder="Enter your password here"
            />
            <div className="w-full flex items-end justify-end text-md text-secondary font-semibold">
              <span>
                Don't have an account? <NavLink to={"/signup"}>Sign Up</NavLink>
              </span>
            </div>
            <Button
              value={isAuthenticating ? <Spinner /> : "Login"}
              className="bg-secondary rounded-xl text-white text-lg font-semibold py-2 hover:bg-primary cursor-pointer"
              disabled={isAuthenticating}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
