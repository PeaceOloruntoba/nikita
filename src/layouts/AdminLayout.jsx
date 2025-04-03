import React from "react";
import Sidebar from "../components/ui/Sidebar";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="w-screen h-screen flex bg-[#F2EBF0]">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="overflow-scroll hide-scrollbar w-5/5 px-4">
        <Outlet />
      </div>
    </div>
  );
}
