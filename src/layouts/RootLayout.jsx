import React from "react";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/ui/Header";
import { Outlet } from "react-router";
import Ai from "../components/ui/Ai";

export default function RootLayout() {
  return (
    <div className="w-screen h-screen flex bg-[#F2EBF0]">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="overflow-scroll hide-scrollbar w-5/5">
        <Outlet />
      </div>
      <div className="w-3/5 h-screen">
        <Ai />
      </div>
    </div>
  );
}
