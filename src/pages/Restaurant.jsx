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
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fqr-code-vector-icon_33320307.htm&psig=AOvVaw388BFduFWuP42sPqZYTHfa&ust=1739012755263000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDAzr-1sYsDFQAAAAAdAAAAABAE",
    },
    {
      id: 2,
      number: 4,
      qrCode:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fqr-code-vector-icon_33320307.htm&psig=AOvVaw388BFduFWuP42sPqZYTHfa&ust=1739012755263000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDAzr-1sYsDFQAAAAAdAAAAABAE",
    },
    {
      id: 3,
      number: 0,
      qrCode:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fqr-code-vector-icon_33320307.htm&psig=AOvVaw388BFduFWuP42sPqZYTHfa&ust=1739012755263000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDAzr-1sYsDFQAAAAAdAAAAABAE",
    },
    {
      id: 4,
      number: 0,
      qrCode:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fqr-code-vector-icon_33320307.htm&psig=AOvVaw388BFduFWuP42sPqZYTHfa&ust=1739012755263000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDAzr-1sYsDFQAAAAAdAAAAABAE",
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
