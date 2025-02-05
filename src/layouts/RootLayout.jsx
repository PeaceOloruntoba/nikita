import React from "react";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/ui/Header";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
