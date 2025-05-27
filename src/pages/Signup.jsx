import React, { useState } from "react";
import { loginBg } from "../assets";
import { NavLink, useNavigate } from "react-router";
import Button from "../components/shared/Button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useAuthStore from "../store/useAuthStore";
import Spinner from "../components/shared/Spinner";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp, isAuthenticating } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "admin",
    },
  });
  const password = watch("password");
  const [activeTab, setActiveTab] = useState("admin");

  async function onSubmit(data) {
    if (data.password !== data.confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!data.terms_accepted) {
      toast.error("You must agree to the terms and conditions!");
      return;
    }
    await signUp(data, navigate);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center relative">
      <img
        src={loginBg}
        alt="Background"
        className="w-screen h-screen object-cover absolute"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/30 p-8 md:p-12 rounded-2xl shadow-xl flex flex-col w-full max-w-sm md:max-w-md gap-6">
          <span className="text-primary text-3xl font-bold text-center">
            Signup
          </span>
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                setActiveTab("admin");
                setValue("role", "admin");
              }}
              className={`flex-1 py-2 text-center rounded-l-xl ${
                activeTab === "admin"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Restaurant
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("user");
                setValue("role", "user");
              }}
              className={`flex-1 py-2 text-center rounded-r-xl ${
                activeTab === "user"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Customer
            </button>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="bg-white outline-none border p-3 rounded-xl w-full focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="bg-white outline-none border p-3 rounded-xl w-full focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="bg-white outline-none border p-3 rounded-xl w-full focus:ring-2 focus:ring-primary"
                placeholder="Confirm your password"
              />
              {errors.confirm_password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("terms_accepted", {
                  required: "You must agree to the terms and conditions",
                })}
                className="w-4 h-4"
              />
              <span className="text-sm text-white">
                I agree to the terms and conditions.
              </span>
              {errors.terms_accepted && (
                <span className="text-red-500 text-sm ml-1">
                  {errors.terms_accepted.message}
                </span>
              )}
            </div>
            <input type="hidden" {...register("role")} />
            <div className="text-sm text-white font-semibold text-right">
              Already have an account?{" "}
              <NavLink to="/login" className="underline">
                Login
              </NavLink>
            </div>
            <Button
              value={isAuthenticating ? <Spinner /> : "Signup"}
              className="bg-secondary rounded-xl text-white text-lg font-semibold py-2 hover:bg-primary cursor-pointer disabled:opacity-50"
              disabled={isAuthenticating}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
