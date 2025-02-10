import React from "react";
import { NavLink } from "react-router";

export default function PageNotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-center text-3xl bg-secondary text-primary font-semibold">
      PageNotFound Go back <NavLink to={"/"}>Home</NavLink>
    </div>
  );
}
