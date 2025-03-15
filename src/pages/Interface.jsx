import React from "react";
import { restaurant } from "../assets";

export default function Interface() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-8">
      <img src={restaurant} alt="" className="w-full" />
    </div>
  );
}
