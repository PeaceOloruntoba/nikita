import React from "react";
import { Adder, Lister } from "../components/Questionaries";

export default function Questionaries() {
  return (
    <div className="w-full h-full p-8">
      <div className="grid grid-cols-3 gap-8 w-full h-full">
        <div className="w-full h-full">
          <Adder />
        </div>
        <div className="w-full h-full col-span-2">
          <Lister />
        </div>
      </div>
    </div>
  );
}
