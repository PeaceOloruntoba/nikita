import React from "react";
import { loginBg } from "../assets";
import { NavLink, useNavigate } from "react-router";
import Button from "../components/shared/Button";
import useAuthStore from "../store/useAuthStore";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Spinner from "../components/shared/Spinner";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticating } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    await login(data, navigate);
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
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="bg-white outline-none border p-3 rounded-xl w-full"
                placeholder="Enter your email or username"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                {...register("password", { required: "Password is required" })}
                className="bg-white outline-none border p-3 rounded-xl w-full"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
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
