import React from "react";
import { iconn } from "../../assets";
import { NavLink, useNavigate } from "react-router";
import { IoQrCodeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineInsights, MdOutlineModelTraining } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { BiLogOut, BiSupport } from "react-icons/bi";
import { MdOutlineReviews } from "react-icons/md";
import useAuthStore from "../../store/useAuthStore";

export default function AdminSidebar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  function handleLogout() {
    logout(navigate);
  }
  return (
    <div className="h-screen">
      <div className="flex flex-col w-full gap-4 h-full">
        <div className="flex">
          <img src={iconn} className="rounded-full pb-4" alt="" />
        </div>
        <div className="flex flex-col items-center justify-between text-primary text-md font-semibold h-full">
          <div className="flex flex-col w-full">
            <NavLink
              to={"/admin/dashboard"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-100 w-full text-left p-4 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <MdOutlineInsights size={20} />
              Dashboard
            </NavLink>
            <NavLink
              to={"/admin/restaurants"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-100 w-full text-left p-3 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <FaBookReader size={20} />
              Restaurants
            </NavLink>
            <NavLink
              to={"/admin/users"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-100 w-full text-left p-4 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <MdOutlineModelTraining size={20} />
              Users
            </NavLink>
            <NavLink
              to={"/admin/support"}
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-100 w-full text-left p-4 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <BiSupport size={20} />
              Support
            </NavLink>
          </div>
          <div className="flex flex-col w-full">
            <hr />
            <button
              onClick={handleLogout}
              className="flex p-2 border rounded-lg gap-2 items-center bg-primary text-white m-4 cursor-pointer"
            >
              Logout
              <BiLogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
