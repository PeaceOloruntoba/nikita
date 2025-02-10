import React from "react";
import PageNotFound from "../pages/PageNotFound";
import { Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function AdminGuard() {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  console.log(user);

  if (!user?.roles?.includes("admin")) {
    return <PageNotFound />;
  }

  return <Outlet />;
}
