/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

export default function AdminGuard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]); // Depend on user and navigate

  // if (!user || user?.roles !== "admin") {
  //   return null; // or a loading state. prevent outlet.
  // }

  return <Outlet />;
}
