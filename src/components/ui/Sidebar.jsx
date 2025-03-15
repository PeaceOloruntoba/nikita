import React from "react";
import { profilePic } from "../../assets";
import { NavLink, useNavigate } from "react-router";
import { IoSettingsOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiCalendar, CiShare2 } from "react-icons/ci";
import { FaBookReader } from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("*");
    navigate("/login");
  }
  return (
    <div className="h-screen">
      <div className="flex flex-col w-full gap-4 h-full">
        <div className="flex">
          <img src={profilePic} className="rouded-full px-20 py-4" alt="" />
        </div>
        <div className="flex flex-col items-center justify-between text-primary text-md font-semibold h-full">
          <div className="flex flex-col w-full">
            <NavLink
              to={"/interface"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-3 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <FaBookReader size={20} />
              Interface
            </NavLink>
            <NavLink
              to={"/insight"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-4 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <CiShare2 size={20} />
              AI Insights
            </NavLink>
            <NavLink
              to={"/qr-codes"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-3 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <FaBookReader size={20} />
              QR Codes
            </NavLink>
            <NavLink
              to={"/insight"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-4 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <CiShare2 size={20} />
              AI Training
            </NavLink>
            <NavLink
              to={"/reviews"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-4 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <CiCalendar size={20} />
              Reviews
            </NavLink>
            <NavLink
              to={"/support"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-4 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <CiCalendar size={20} />
              Support
            </NavLink>
            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-4 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <CiCalendar size={20} />
              Settings
            </NavLink>
          </div>
          <div className="flex flex-col w-full">
            <hr />
            <button
              onClick={() => handleLogout()}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-4 px-6 flex gap-2 items-center"
                  : " w-full text-left p-4 flex gap-2 items-center"
              }
            >
              <IoSettingsOutline size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
