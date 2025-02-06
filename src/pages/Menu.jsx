import React from "react";
import { MenuCategory } from "../components/Menu";

export default function Menu() {
  return (
    <div className="m-6 border-b border-[#4895E5]/25 p-6 grid grid-cols-2">
      <MenuCategory />
    </div>
  );
}
