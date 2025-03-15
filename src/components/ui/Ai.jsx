import React from "react";
import { annawine } from "../../assets";

export default function Ai() {
  return (
    <div className="h-screen flex items-center justify-center text-xl font-semibold relative">
      <img src={annawine} alt="" className="w-full h-full" />
      <div className="absolute w-full bottom-0">
        <div className="bg-transparent p-4 w-full">
          <input
            type="text"
            placeholder="Chat with Annawine"
            className="w-full bg-white/40 border border-primary outline-none rounded-lg p-2"
          />
        </div>
      </div>
    </div>
  );
}
