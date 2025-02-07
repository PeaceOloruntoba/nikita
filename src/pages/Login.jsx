import React from "react";
import { loginBg } from "../assets";
import { NavLink, useNavigate } from "react-router";
import Button from "../components/shared/Button";

export default function Login() {
  const navigate = useNavigate();
  function handleLogin() {
    navigate("/feedback");
    toast.success("Login Successful!");
  }
  return (
    <div className="w-screen h-screen relative">
      <img src={loginBg} alt="" className="w-screen h-screen object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur  p-12 rounded-2xl shadow-xl flex flex-col w-1/3 gap-6">
          <span className="text-primary text-3xl font-bold w-full text-center">
            Login
          </span>
          <form className="flex flex-col gap-8">
            <input
              type="text"
              className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              placeholder="Enter your email or username here"
            />
            <input
              type="password"
              className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              placeholder="Enter your password here"
            />
            <div className="w-full flex items-end justify-end text-md text-secondary font-semibold">
              <span className="">
                Don't have an account? <NavLink to={"/signup"}>Sign Up</NavLink>
              </span>
            </div>
            <Button
              value={"Login"}
              className="bg-secondary rounded-xl text-white text-lg font-semibold py-2 hover:bg-primary cursor-pointer"
              onClick={() => handleLogin()}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
