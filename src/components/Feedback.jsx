import React from "react";
import { FaStar } from "react-icons/fa6";

export function FeedbackTitleCard({ card }) {
  return (
    <div
      className="flex items-center justify-center font-semibold text-md"
      key={card?.id}
    >
      <div className="p-3 rounded-lg flex w-full items-center justify-between bg-white">
        <div className="flex items-center justify-center gap-2">
          {card?.icon}
          <span>{card?.name}</span>
        </div>
        <span className="text-xl">{card?.value}</span>
      </div>
    </div>
  );
}

export function FeedbackCard({ card }) {
  return (
    <div
      className="p-3 rounded-lg flex flex-col w-full items-center justify-between bg-white"
      key={card?.id}
    >
      <div className="flex items-center justify-between pb-1 w-full">
        <span className="text-[#3a3a3a] text-md font-medium">
          {card?.user?.name}, {card?.user?.surname}
        </span>
        <span className="bg-[#FBBB00] px-2 py-1 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1">
          <FaStar size={10} />
          {card?.rating}.0
        </span>
      </div>
      <hr className="w-full border-[#EDEDED] my-1" />
      <span className="text-[#3a3a3a]/80 text-xs">{card?.content}</span>
    </div>
  );
}
