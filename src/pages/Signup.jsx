import React, { useState } from "react";
import { loginBg } from "../assets";
import { NavLink, useNavigate } from "react-router";
import Button from "../components/shared/Button";
import { toast } from "sonner";
import useAuthStore from "../store/useAuthStore";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp, isAuthenticating } = useAuthStore();

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!user.agreed) {
      toast.error("You must agree to the terms and conditions!");
      return;
    }
    await signUp(user, navigate);
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
            Signup
          </span>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              required
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="bg-white outline-none border p-3 rounded-xl"
              placeholder="Enter your email"
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
            <input
              required
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="bg-white outline-none border p-3 rounded-xl"
              placeholder="Confirm your password"
            />
            <div className="flex items-center gap-2">
              <input
                required
                type="checkbox"
                name="agreed"
                checked={user.agreed}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm">
                I agree to the terms and conditions.
              </span>
            </div>
            <div className="text-sm text-secondary font-semibold text-right">
              Already have an account?{" "}
              <NavLink to="/login" className="text-primary">
                Login
              </NavLink>
            </div>
            <Button
              value={isAuthenticating ? "Signing up..." : "Signup"}
              className="bg-secondary rounded-xl text-white text-lg font-semibold py-2 hover:bg-primary cursor-pointer disabled:opacity-50"
              disabled={isAuthenticating}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
