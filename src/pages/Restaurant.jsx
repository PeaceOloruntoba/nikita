import React from "react";
import Button from "../components/shared/Button";
import { MdOutlineAddCircleOutline } from "react-icons/md";

export default function Restaurant() {
  return (
    <div className="w-full h-full flex flex-col items-center p-8">
      <div className="flex w-full items-end justify-end">
        <Button
          className="cursor-pointer bg-[#4895E5] text-white px-3 py-1 rounded-lg"
          value={
            <span className="flex gap-2 items-center justify-center text-xl font-semibold">
              <MdOutlineAddCircleOutline size={18} /> Add Table
            </span>
          }
        />
      </div>
    </div>
  );
}
