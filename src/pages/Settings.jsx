import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

export default function Settings() {
  const navigate = useNavigate();
  const { profile, getProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  console.log(profile)

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 m-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Profile Settings
      </h2>

      <div className="space-y-4">
        <ProfileItem label="First Name" value={profile?.first_name} />
        <ProfileItem label="Last Name" value={profile?.last_name} />
        <ProfileItem label="Location" value={profile?.location} />
        <ProfileItem label="Restaurant Name" value={profile?.restaurant_name} />
        <ProfileItem
          label="Restaurant Address"
          value={profile?.restaurant_address}
        />

        <button
          onClick={() => navigate("/update-profile")}
          className="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

// Reusable Profile Item Component
const ProfileItem = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-800 font-medium">{value || "N/A"}</span>
  </div>
);
