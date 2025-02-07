import React from "react";
import { loginBg } from "../assets";
import { NavLink, useNavigate } from "react-router";
import Button from "../components/shared/Button";

export default function Signup() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen relative">
      <img src={loginBg} alt="" className="w-screen h-screen object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur  p-12 rounded-2xl shadow-xl flex flex-col w-1/3 gap-6">
          <span className="text-primary text-5xl font-bold w-full text-center">
            Login
          </span>
          <form className="flex flex-col gap-8">
            <input
              type="text"
              className="bg-white outline-none border-none p-8 py-4 rounded-xl"
              placeholder="Enter your email or username here"
            />
            <input
              type="password"
              className="bg-white outline-none border-none p-8 py-4 rounded-xl"
              placeholder="Enter your password here"
            />
            <input
              type="password"
              className="bg-white outline-none border-none p-8 py-4 rounded-xl"
              placeholder="Enter your password again"
            />
            <div className="w-full flex items-end justify-end text-2xl text-secondary font-semibold">
              <span className="">
                Already have an account? <NavLink to={"/login"}>Login</NavLink>
              </span>
            </div>
            <Button
              value={"Login"}
              className="bg-secondary rounded-xl text-white text-2xl font-semibold py-4 hover:bg-primary cursor-pointer"
              onClick={() => navigate("/feedback")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
