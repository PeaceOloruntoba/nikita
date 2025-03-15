import React from "react";
import { restaurant } from "../assets";

export default function Interface() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-8 p-8">
      <span className="w-full text-2xl font-semibold">Restaurant Name</span>
      <img src={restaurant} alt="" className="w-full rounded-2xl h-64" />
      <div className="flex items-center justify-center gap-8">
        <div className="flex flex-col">
          <span className="w-full text-lg font-semibold">Food Menu</span>
          <img src={restaurant} alt="" className="w-fit rounded-2xl h-64" />
        </div>
        <img src={restaurant} alt="" className="w-fit rounded-2xl h-64" />
      </div>
    </div>
  );
}
