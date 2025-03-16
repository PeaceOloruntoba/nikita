import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

export default function QrCodes() {
  const navigate = useNavigate();
  const { profile, getProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  console.log(profile);
  return <div>QrCodes</div>;
}
