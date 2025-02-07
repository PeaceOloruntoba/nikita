import React from "react";
import Button from "../components/shared/Button";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Card } from "../components/Restaurant";

export default function Restaurant() {
  const tables = [
    {
      id: 1,
      number: 4,
      qrCode:
        "https://static.vecteezy.com/system/resources/previews/011/008/568/non_2x/black-qr-code-scan-free-vector.jpg",
    },
    {
      id: 2,
      number: 4,
      qrCode:
        "https://static.vecteezy.com/system/resources/previews/011/008/568/non_2x/black-qr-code-scan-free-vector.jpg",
    },
    {
      id: 3,
      number: 0,
      qrCode:
        "https://static.vecteezy.com/system/resources/previews/011/008/568/non_2x/black-qr-code-scan-free-vector.jpg",
    },
    {
      id: 4,
      number: 0,
      qrCode:
        "https://static.vecteezy.com/system/resources/previews/011/008/568/non_2x/black-qr-code-scan-free-vector.jpg",
    },
  ];
  return (
    <div className="w-full h-full flex flex-col items-center p-8 gap-8">
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
      <div className="grid grid-cols-4 gap-8 w-full">
        {tables?.map((data) => (
          <Card number={data?.number} qrCode={data?.qrCode} key={data?.id} />
        ))}
      </div>
    </div>
  );
}
