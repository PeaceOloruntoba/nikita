import React, { useState } from "react";
import { useNavigate } from "react-router";
import { PiUserBold } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import useAuthStore from "../../store/useAuthStore";

export default function Header() {
  const { logoutUser } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  function handleLogout() {
    logoutUser(navigate);
  }
  return (
    <div className="w-full flex p-4 items-center justify-end">
      <div className="relative hidden md:block">
        <div className="">
          <div
            className={`group p-2 text-lg flex flex-col gap-2 group:shadow-lg items-center text-[#3A3A3A] rounded-lg relative`}
            type="button"
            onClick={toggleDropdown}
          >
            <div className="flex gap-3 items-center justify-between cursor-pointer w-28">
              <span className="font-medium flex gap-1 items-center justify-center">
                <PiUserBold size={16} />
                Profile
              </span>
              <svg
                className={`w-2.5 h-2.5 ms-3 transition-transform transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </div>
            {/* Dropdown content */}
            {isOpen && (
              <div className="absolute top-full w-full group:shadow-lg rounded-lg mt-1">
                <button
                  className="rounded-lg w-full px-4 text-sm text-white cursor-pointer py-2 font-semibold text-nowrap flex items-center gap-2 justify-center bg-secondary"
                  onClick={() => handleLogout()}
                >
                  <LuLogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
