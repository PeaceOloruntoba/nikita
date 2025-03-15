import React from "react";
import { menu, restaurant } from "../assets";

export default function Interface() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-8 p-8">
      <span className="w-full text-2xl font-semibold">Restaurant Name</span>
      <img src={restaurant} alt="" className="w-full rounded-2xl h-64" />
      <div className="flex items-center justify-center gap-8 w-full">
        <button className="flex flex-col w-full items-start">
          <span className="text-lg font-semibold">Food Menu</span>
          <img src={menu} alt="" className="w-full rounded-2xl h-44" />
        </button>
        <button className="flex flex-col w-full items-start">
          <span className="text-lg font-semibold">Wine Menu</span>
          <img src={menu} alt="" className="w-full rounded-2xl h-44" />
        </button>
      </div>
    </div>
  );
}
