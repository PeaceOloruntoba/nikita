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
      <div className="bg-white rounded-lg p-6 text-2xl flex flex-col gap-6 w-[400px] h-[600px]">
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
        <div className="bg-[#D02C46] p-6 rounded-lg flex items-center justify-center text-white">
          <span className="text-white p-12">
            <PiWarningCircleThin size={30} />
          </span>
          <span>
            Achtung: Bitte wählen Sie alle Ihre Allergien aus, um
            sicherzustellen, dass Ihren Gästen keine falschen Gerichte
            vorgeschlagen werden. So können wir Ihren Gästen eine sichere und
            passende Auswahl bieten!
          </span>
        </div>
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Search ingredient"
        />
        <hr />
        <ul className="flex flex-col items-center gap-4 text-[#3A3A3A] w-full h-full">
          <li className="flex items-center justify-between w-full px-2">
            Ingredient 1 <input type="checkbox" name="ingredient1" />
          </li>
          <li className="flex items-center justify-between w-full px-2">
            Ingredient 2{" "}
            <input
              type="checkbox"
              checked
              name="ingredient2"
              className="text-[#6C1233]"
            />
          </li>
        </ul>
        <button className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center text-center justify-center">
          <MdCheckCircleOutline size={18} />
        </button>
      </div>
    </div>
  );
}
