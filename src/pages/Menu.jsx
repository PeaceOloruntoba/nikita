import React from "react";
import { MenuCategory } from "../components/MenuCategory";
import { DishCategory } from "../components/DishCategory";

export default function Menu() {
  return (
    <div className="m-2 border-b border-[#4895E5]/25 p-3 grid grid-cols-2 h-full gap-6">
      <MenuCategory />
      <DishCategory />
    </div>
  );
}
