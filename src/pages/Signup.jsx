import React from "react";
import { loginBg } from "../assets";
import { NavLink, useNavigate } from "react-router";
import Button from "../components/shared/Button";
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();
  function handleSignup() {
    navigate("/login");
    toast.success("Signup Successful, Please Login!");
  }
  return (
    <div className="w-screen h-screen relative">
      <img src={loginBg} alt="" className="w-screen h-screen object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur  p-12 rounded-2xl shadow-xl flex flex-col w-1/3 gap-6">
          <span className="text-primary text-3xl font-bold w-full text-center">
            Signup
          </span>
          <form className="flex flex-col gap-8">
            <input
              required
              type="text"
              className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              placeholder="Enter your email or username here"
            />
            <input
              required
              type="password"
              className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              placeholder="Enter your password here"
            />
            <input
              required
              type="password"
              className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              placeholder="Enter your password again"
            />
            <div className="flex items-center gap-2">
              <input
                required
                type="checkbox"
                className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              />
              <span>I agree to terms and conditions.</span>
            </div>
            <div className="w-full flex items-end justify-end text-md text-secondary font-semibold">
              <span className="">
                Already have an account? <NavLink to={"/login"}>Login</NavLink>
              </span>
            </div>
            <Button
              value={"Signup"}
              className="bg-secondary rounded-xl text-white text-lg font-semibold py-2 hover:bg-primary cursor-pointer"
              onClick={() => handleSignup()}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
