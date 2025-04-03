/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";

export default function SuperAdminGuard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    console.log("endd");
    if (!user.role == "superadmin") {
      navigate("/login");
    }
  }, [user, navigate]);

  return <Outlet />;
}
