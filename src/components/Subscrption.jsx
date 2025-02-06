import React from "react";

export function Cards({ value, border }) {
  return (
    <div
      className={`bg-white p-6 flex flex-col items-center justify-between h-[250px] border-${border} rounded-lg`}
    >
      <span>{value}</span>
      <button className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center text-center justify-center">
        <MdCheckCircleOutline size={18} />
      </button>
    </div>
  );
}

export function EditSubscription({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 text-2xl flex flex-col gap-6 w-[400px]">
        <button onClick={onClose} className="self-end text-gray-600">
          <MdOutlineCancel size={24} />
        </button>
        <div className="flex flex-col">
          <label htmlFor="">Address</label>
          <input
            type="text"
            className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
            placeholder="Address"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Break Start Time</label>
          <input
            type="text"
            className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
            placeholder="Address"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Break End Time</label>
          <input
            type="text"
            className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
            placeholder="Address"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Days of the week</label>
          <input
            type="text"
            className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
            placeholder="Address"
          />
        </div>
        <button className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center text-center justify-center">
          <MdCheckCircleOutline size={18} />
        </button>
      </div>
    </div>
  );
}
