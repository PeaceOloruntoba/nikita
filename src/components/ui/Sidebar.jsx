import React from "react";
import { profilePic } from "../../assets";
import { NavLink } from "react-router";
import { IoSettingsOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";

export default function Sidebar() {
  return (
    <div className="bg-primary py-12 h-screen">
      <div className="flex flex-col w-full gap-8 h-full">
        <div className="flex">
          <img src={profilePic} className="rouded-full px-26 py-10" alt="" />
        </div>
        <div className="flex flex-col items-center justify-between text-white text-2xl font-semibold h-full">
          <div className="flex flex-col w-full">
            <NavLink
              to={"/feedback"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-8 px-10 flex gap-2 items-center"
                  : " w-full text-left p-8 flex gap-2 items-center"
              }
            >
              <PiUsersThree size={20} />
              Feedback
            </NavLink>
            <NavLink
              to={"/menu"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-8 px-10 flex gap-2 items-center"
                  : " w-full text-left p-8 flex gap-2 items-center"
              }
            >
              <MdOutlineSpaceDashboard size={20} />
              Menu
            </NavLink>
            <NavLink
              to={"/subscription"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-8 px-10 flex gap-2 items-center"
                  : " w-full text-left p-8 flex gap-2 items-center"
              }
            >
              <CiCalendar size={20} />
              Subscription
            </NavLink>
            <NavLink
              to={"/questionaries"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-8 px-10 flex gap-2 items-center"
                  : " w-full text-left p-8 flex gap-2 items-center"
              }
            >
              <CiCalendar size={20} />
              Questionaries
            </NavLink>
            <NavLink
              to={"/restaurant"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-8 px-10 flex gap-2 items-center"
                  : " w-full text-left p-8 flex gap-2 items-center"
              }
            >
              <CiCalendar size={20} />
              Restaurant
            </NavLink>
          </div>
          <div className="flex flex-col w-full">
            <hr />
            <NavLink
              to={"/settings"}
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary w-full text-left p-8 px-10 flex gap-2 items-center"
                  : " w-full text-left p-8 flex gap-2 items-center"
              }
            >
              <IoSettingsOutline size={20} />
              Settings
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
