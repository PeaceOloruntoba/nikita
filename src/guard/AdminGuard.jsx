import React from "react";
import PageNotFound from "../pages/PageNotFound";
import { Outlet } from "react-router";
import useAuthStore from "../store/useAuthStore";

export default function AdminGuard() {
  const { user } = useAuthStore();

  if (!user?.roles == "admin") {
    return <PageNotFound />;
  }

  return <Outlet />;
}
