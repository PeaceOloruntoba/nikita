import React, { useState } from "react";
import Button from "./shared/Button";
import {
  MdOutlineCancel,
  MdCheckCircleOutline,
  MdOutlineAddCircleOutline,
  MdModeEdit,
} from "react-icons/md";
import { PiWarningCircleThin } from "react-icons/pi";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg p-4 h-full text-2xl flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <Button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
          value={<MdOutlineAddCircleOutline size={18} />}
          onClick={() => setIsModalOpen(true)}
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

      {/* Render Modal when isModalOpen is true */}
      {isModalOpen && <AddDishCategory onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export function AddDishCategory({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 text-2xl flex flex-col gap-6 w-[400px] h-[600px]">
        <button onClick={onClose} className="self-end text-gray-600">
          <MdOutlineCancel size={24} />
        </button>
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Dish Name"
        />
        <div className="bg-[#D02C46] p-6 rounded-lg flex items-center justify-center text-white">
          <span className="text-white p-12">
            <PiWarningCircleThin size={30} />
          </span>
          <span>
            Achtung: Bitte wählen Sie alle Ihre Allergien aus, um
            sicherzustellen, dass Ihren Gästen keine falschen Gerichte
            vorgeschlagen werden. So können wir Ihren Gästen eine sichere und
            passende Auswahl bieten!
          </span>
        </div>
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Search ingredient"
        />
        <hr />
        <ul className="flex flex-col items-center gap-4 text-[#3A3A3A] w-full h-full">
          <li className="flex items-center justify-between w-full px-2">
            Ingredient 1 <input type="checkbox" name="ingredient1" />
          </li>
          <li className="flex items-center justify-between w-full px-2">
            Ingredient 2{" "}
            <input
              type="checkbox"
              checked
              name="ingredient2"
              className="text-[#6C1233]"
            />
          </li>
        </ul>
        <button className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center text-center justify-center">
          <MdOutlineCancel size={18} />
        </button>
      </div>
    </div>
  );
}
