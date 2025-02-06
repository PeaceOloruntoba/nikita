import React from "react";
import Button from "./shared/Button";
import {
  MdOutlineCancel,
  MdCheckCircleOutline,
  MdOutlineAddCircleOutline,
} from "react-icons/md";

export function MenuCategory() {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center gap-6">
        <input
          type="text"
          className="border-none p-2 rounded-lg"
          placeholder="Add Categorie"
        />
        <Button
          className="bg-[#4895E5]"
          value={<MdOutlineAddCircleOutline />}
        />
      </div>
    </div>
  );
}
export default function Menu() {
  return <div>Menu</div>;
}
