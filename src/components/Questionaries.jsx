import React from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import Button from "./shared/Button";

export function Adder() {
  return (
    <div className="w-full h-full bg-white rounded-lg p-8">
      <div className="flex flex-col gap-4 text-[#A44B6F]/30">
        <div className="flex items-center gap-6">
          <input
            type="text"
            className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A]/50 focus:outline-[#4895E5]"
            placeholder="Add Categorie"
            disabled
          />
          <Button
            className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
            value={<MdCheckCircleOutline size={18} />}
            onClick={() => setIsEditOpen(true)}
          />
        </div>
        <hr />
        <div className="flex items-center gap-6">
          <input
            type="text"
            className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A]/50 focus:outline-[#4895E5]"
            placeholder="Categorie 1"
            disabled
          />
          <Button
            className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
            value={<MdOutlineCancel size={18} />}
            onClick={() => setIsEditOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}
export function Lister() {
  return (
    <div className="w-full h-full bg-white rounded-lg p-8 text-xl">
      <div className="flex flex-col gap-4 text-[#A44B6F]/30">
        <div className="flex items-center gap-6">
          <span
            className="border-none outline outline-[#4895E5]/20 p-3
            rounded-lg w-full text-[#3A3A3A]/50 focus:outline-[#4895E5]"
          >
            rwerwerwerwer rwerwerwerwer rwerwerwerwer rwerwerwerwer 1231231231
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span
            className="border-none outline outline-[#4895E5]/20 p-3
            rounded-lg w-full text-[#3A3A3A]/50 focus:outline-[#4895E5]
            text-wrap"
          >
            rwerwerwerwer rwerwerwerwer rwerwerwerwer rwerwerwerwer 123123123
            112312312311231231231123123123112312312311231231231
          </span>
        </div>
      </div>
    </div>
  );
}
export default function Questionaries() {
  return <div>Questionaries</div>;
}
