/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

export default function SuperAdminGuard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (user.role !== "superadmin") {
      navigate("/login");
    }
  }, [user, navigate]); // Depend on user and navigate

  // if (!user || user?.roles !== "admin") {
  //   return null; // or a loading state. prevent outlet.
  // }

  return <Outlet />;
}
