import React from "react";
import { FaStar } from "react-icons/fa6";

export function FeedbackTitleCard({ card }) {
  return (
    <div
      className="flex items-center justify-center font-semibold text-2xl"
      key={card?.id}
    >
      <div className="p-6 rounded-lg flex w-full items-center justify-between bg-white">
        <div className="flex items-center justify-center gap-4">
          {card?.icon}
          <span>{card?.name}</span>
        </div>
        <span className="text-4xl">{card?.value}</span>
      </div>
    </div>
  );
}

export function FeedbackCard({ card }) {
  return (
    <div
      className="p-6 rounded-lg flex flex-col w-full  items-center justify-between bg-white"
      key={card?.id}
    >
      <div className="flex items-center justify-between py-2 w-full">
        <span className="text-[#3a3a3a] text-2xl font-medium">
          {card?.firstName}, {card?.lastName}
        </span>
        <span className="bg-[#FBBB00] px-4 py-1 text-white rounded-lg text-lg font-semibold flex items-center justify-center gap-2">
          <FaStar size={10} />
          {card?.stars}.0
        </span>
      </div>
      <hr className="w-full border-[#EDEDED] my-2" />
      <span className="text-[#3a3a3a]/70">{card?.feedback}</span>
    </div>
  );
}
