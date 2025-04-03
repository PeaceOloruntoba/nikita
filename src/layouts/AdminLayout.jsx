import React from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../components/ui/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="w-screen h-screen flex bg-[#F2EBF0]">
      <div className="w-1/4">
        <AdminSidebar />
      </div>
      <div className="overflow-scroll hide-scrollbar w-5/5 px-4">
        <Outlet />
      </div>
    </div>
  );
}
