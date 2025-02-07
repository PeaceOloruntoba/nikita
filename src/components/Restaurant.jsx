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
export function Details() {
  return (
    <div className="p-8 bg-white rounded-lg flex flex-col">
      <div className="flex flex-col">
        <span>Name of Person 1 who scanned the qr code</span>
        <div className="flex items-center justify-between">
          <span>Dish</span>
          <span>30€</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Dish</span>
          <span>30€</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Drink</span>
          <span>30€</span>
        </div>
      </div>
    </div>
  );
}
