import React, { useEffect } from "react";
import { menu, restaurant } from "../assets";
import { useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

export default function Interface() {
  const { profile, getProfile, getUser, user } = useAuthStore();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    await getProfile();
    await getUser();
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  function handleNav(dir) {
    navigate(dir);
  }

  return (
    <div className="flex flex-col w-full items-center justify-center gap-8 p-8">
      <span className="w-full text-2xl font-semibold">
        {profile?.restaurant_name || "Restaurant Name"}
      </span>
      <img
        src={profile?.restaurant_image || restaurant}
        alt={profile?.restaurant_name || "Restaurant"}
        className="w-full rounded-2xl h-64"
      />
      <div className="flex items-center justify-center gap-8 w-full">
        <button
          className="flex flex-col w-full items-start cursor-pointer"
          onClick={() => {
            handleNav("food-menu");
          }}
        >
          <span className="text-lg font-semibold">Food Menu</span>
          <img
            src={profile?.food_menu_card_image || menu}
            alt="Food Menu"
            className="w-full rounded-2xl h-44"
          />
        </button>
        <button
          className="flex flex-col w-full items-start cursor-pointer"
          onClick={() => {
            handleNav("wine-menu");
          }}
        >
          <span className="text-lg font-semibold">Wine Menu</span>
          <img
            src={profile?.wine_menu_card_image || menu} // Use profile menu image if available
            alt="Wine Menu"
            className="w-full rounded-2xl h-44"
          />
        </button>
      </div>
    </div>
  );
}
