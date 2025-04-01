import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

export default function Settings() {
  const navigate = useNavigate();
  const { profile, getProfile } = useAuthStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 m-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Restaurant Settings
      </h2>

      {!profile ? (
        <p className="text-gray-500">Loading profile...</p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-6 w-full">
            <button
              onClick={() => navigate("/update-profile")}
              className="w-full bg-primary cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition"
            >
              Update Profile
            </button>
            {profile && (
              <button
                onClick={() => navigate("/subscription")}
                className="w-full bg-primary cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition"
              >
                Subscribe to use our AI
              </button>
            )}
          </div>
          {/* General Info */}
          <ProfileItem label="First Name" value={profile.first_name} />
          <ProfileItem label="Last Name" value={profile.last_name} />
          <ProfileItem label="Location" value={profile.location} />
          <ProfileItem
            label="Restaurant Name"
            value={profile.restaurant_name}
          />
          <ProfileItem
            label="Restaurant Address"
            value={profile.restaurant_address}
          />

          <ProfileItem
            label="Legal Representative"
            value={profile.legal_representative}
          />
          <ProfileItem label="Contact Phone" value={profile.contact_phone} />
          <ProfileItem label="Email Address" value={profile.email} />
          <ProfileItem label="Website" value={profile.website} />
          <ProfileItem label="Service Style" value={profile.service_style} />
          <ProfileItem
            label="Exclusive Dishes/Wines"
            value={profile.exclusive_dishes}
          />
          <ProfileItem
            label="Seasonal Menu"
            value={profile.seasonal_menu ? "Yes" : "No"}
          />
          <ProfileItem
            label="Menu Change Frequency"
            value={profile.menu_update_frequency}
          />
          <ProfileItem
            label="Daily Menu"
            value={profile.daily_menu ? "Yes" : "No"}
          />
          <ProfileItem
            label="Seating Capacity"
            value={profile.seating_capacity}
          />
          <ProfileItem label="Staff Using AI" value={profile.staff_using_ai} />
          <ProfileItem
            label="AI Language Support"
            value={profile.ai_languages?.join(", ")}
          />
          <ProfileItem
            label="AI Communication Style"
            value={profile.ai_communication_style}
          />
          <ProfileItem
            label="Video Support"
            value={profile.video_support ? "Yes" : "No"}
          />
          <ProfileItem
            label="Menu Update Frequency"
            value={profile.menu_update_frequency}
          />
          <ProfileItem
            label="Additional Features"
            value={profile.additional_features}
          />
        </div>
      )}
    </div>
  );
}

const ProfileItem = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-800 font-medium">{value || "N/A"}</span>
  </div>
);
