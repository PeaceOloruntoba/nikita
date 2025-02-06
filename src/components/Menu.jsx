import React from "react";
import Button from "./shared/Button";
import {
  MdOutlineCancel,
  MdCheckCircleOutline,
  MdOutlineAddCircleOutline,
  MdModeEdit,
} from "react-icons/md";

export function MenuCategory() {
  return (
    <div className="bg-white rounded-lg p-4 h-full text-2xl flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Add Categorie"
        />
        <Button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
          value={<MdCheckCircleOutline size={18} />}
        />
      </div>
      <hr />
      <div className="flex items-center gap-6">
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Categorie 1"
          value={"Categorie 1"}
          disabled
        />
        <Button
          className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
          value={<MdOutlineCancel size={18} />}
        />
      </div>
    </div>
  );
}

export function DishCategory() {
  return (
    <div className="bg-white rounded-lg p-4 h-full text-2xl flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <Button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
          value={<MdOutlineAddCircleOutline size={18} />}
        />
      </div>
      <hr />
      <div className="flex items-center gap-6">
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Dish 1"
          value={"Dish 1"}
          disabled
        />
        <Button
          className="cursor-pointer bg-[#AAAFB6] text-white p-3 rounded-lg"
          value={<MdModeEdit size={18} />}
        />
        <Button
          className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
          value={<MdOutlineCancel size={18} />}
        />
      </div>
    </div>
  );
}

