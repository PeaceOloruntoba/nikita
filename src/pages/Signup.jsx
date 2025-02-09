import React, { useState } from "react";
import { loginBg } from "../assets";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import { toast } from "sonner";
import useAuthStore from "../store/useAuthStore";
import Spinner from "../components/shared/Spinner";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp, isAuthenticating } = useAuthStore((state) => ({
    signUp: state.signUp,
    isAuthenticating: state.isAuthenticating,
  }));

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirm_password: "",
    terms_accepted: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSignup(e) {
    e.preventDefault();
    if (user.password !== user.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!user.terms_accepted) {
      toast.error("You must accept the terms and conditions!");
      return;
    }
    signUp(user, navigate);
  }

  return (
    <div className="w-screen h-screen relative">
      <img src={loginBg} alt="" className="w-screen h-screen object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur p-12 rounded-2xl shadow-xl flex flex-col w-1/3 gap-6">
          <span className="text-primary text-3xl font-bold w-full text-center">
            Signup
          </span>
          <form className="flex flex-col gap-8" onSubmit={handleSignup}>
            <input
              required
              type="text"
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
            <input
              required
              type="password"
              name="confirm_password"
              value={user.confirm_password}
              onChange={handleChange}
              className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              placeholder="Enter your password again"
            />
            <div className="flex items-center gap-2">
              <input
                required
                type="checkbox"
                name="terms_accepted"
                checked={user.terms_accepted}
                onChange={handleChange}
                className="bg-white outline-none border-none p-4 py-2 rounded-xl"
              />
              <span>I agree to terms and conditions.</span>
            </div>
            <div className="w-full flex items-end justify-end text-md text-secondary font-semibold">
              <span>
                Already have an account? <NavLink to={"/login"}>Login</NavLink>
              </span>
            </div>
            <Button
              value={isAuthenticating ? <Spinner /> : "Signup"}
              className="bg-secondary rounded-xl text-white text-lg font-semibold py-2 hover:bg-primary cursor-pointer"
              disabled={isAuthenticating}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
