import React from "react";
import Button from "./shared/Button";
import { MdQrCode } from "react-icons/md";

export function Card({ number, qrCode }) {
  return (
    <div className="bg-white rounded-lg p-4 pb-36">
      <div className="flex items-center justify-between">
        <span>{number}</span>
        <Button
          className="bg-primary p-1 rounded-lg"
          value={
            <span>
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
