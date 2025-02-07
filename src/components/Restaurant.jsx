import React from "react";
import Button from "./shared/Button";
import { MdQrCode } from "react-icons/md";

export function Card({ number, qrCode }) {
  return (
    <div className="bg-white rounded-lg p-4 pb-36 border border-[#D9D9D9] cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="text-2xl text-black">{number}</span>
        <Button
          className="bg-primary p-1 px-2 rounded-lg text-white"
          value={
            <span className="flex items-center gap-2 text-xl font-semibold">
              QR Code <MdQrCode size={18} />
            </span>
          }
        />
      </div>
    </div>
  );
}
export default function Restaurant() {
  return <div>Restaurant</div>;
}
