import React, { useState } from "react";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export function Cards({ value, border, onEdit }) {
  return (
    <div
      className={`bg-white p-6 flex flex-col items-center justify-between h-[250px] border-${border} rounded-lg`}
    >
      <span>{value}</span>
      <button
        className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center text-center justify-center"
        onClick={onEdit}
      >
        <MdCheckCircleOutline size={18} />
      </button>
    </div>
  );
}

export function EditSubscription({ onClose }) {
  const [breakStart, setBreakStart] = useState(null);
  const [breakEnd, setBreakEnd] = useState(null);
  const [days, setDays] = useState([]);
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 text-2xl flex flex-col gap-6 w-[400px]">
        <button onClick={onClose} className="self-end text-gray-600">
          <MdOutlineCancel size={24} />
        </button>
        <div className="flex flex-col">
          <label>Address</label>
          <input
            type="text"
            className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
            placeholder="Enter Address"
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="flex flex-col">
            <label>Break Start Time</label>
            <TimePicker
              value={breakStart}
              onChange={(newValue) => setBreakStart(newValue)}
              renderInput={(params) => (
                <input {...params} className="border p-3 rounded-lg w-full" />
              )}
            />
          </div>
          <div className="flex flex-col">
            <label>Break End Time</label>
            <TimePicker
              value={breakEnd}
              onChange={(newValue) => setBreakEnd(newValue)}
              renderInput={(params) => (
                <input {...params} className="border p-3 rounded-lg w-full" />
              )}
            />
          </div>
        </LocalizationProvider>
        <div className="flex flex-col">
          <FormControl fullWidth>
            <InputLabel>Days of the week</InputLabel>
            <Select
              multiple
              value={days}
              onChange={(e) => setDays(e.target.value)}
            >
              {weekDays.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <button className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center text-center justify-center">
          <MdCheckCircleOutline size={18} /> Save
        </button>
      </div>
    </div>
  );
}
