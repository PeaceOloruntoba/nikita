import React, { useState } from "react";
import { MdOutlineCancel, MdCheckCircleOutline } from "react-icons/md";
import {
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";

// 🟢 Cards Component
export const Cards = ({ value, border, onEdit }) => (
  <div
    className="bg-white p-6 flex flex-col items-center justify-between h-[250px] w-[200px] rounded-lg"
    style={{ border: `3px solid ${border}` }}
  >
    <span className="text-2xl font-medium text-black">{value}</span>
    <button
      className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center justify-center"
      onClick={onEdit}
    >
      <MdCheckCircleOutline size={18} />
    </button>
  </div>
);

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TimePicker = ({ label, time, setTime }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  const handleSave = () => {
    if (hour < 1 || hour > 12 || minute < 0 || minute > 59) return;
    setTime(`${hour}:${minute} ${period}`);
    setShowPicker(false);
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <button
        onClick={() => setShowPicker(true)}
        className="border border-[#4895E5]/25 p-3 rounded-lg w-full text-left"
      >
        {time || "Select Time"}
      </button>

      {showPicker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 text-[#3A3A3A] z-20">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Enter Time</h2>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                value={hour}
                onChange={(e) =>
                  setHour(Math.min(12, Math.max(1, e.target.value)))
                }
                placeholder="HH"
                className="border border-[#4895E5]/25 p-2 rounded w-16 cursor-pointer text-center"
              />
              <span>:</span>
              <input
                type="number"
                value={minute}
                onChange={(e) =>
                  setMinute(Math.min(59, Math.max(0, e.target.value)))
                }
                placeholder="MM"
                className="border border-[#4895E5]/25 p-2 rounded w-16 cursor-pointer text-center"
              />
              <div className="flex flex-col">
                <button
                  onClick={() => setPeriod("AM")}
                  className={`p-2 cursor-pointer ${
                    period === "AM" ? "bg-gray-200" : ""
                  }`}
                >
                  AM
                </button>
                <button
                  onClick={() => setPeriod("PM")}
                  className={`p-2 cursor-pointer ${
                    period === "PM" ? "bg-gray-200" : ""
                  }`}
                >
                  PM
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setShowPicker(false)}
                className="text-red-500 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="text-green-500 cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const EditSubscription = ({ onClose }) => {
  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDayChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value.includes("all")) {
      setSelectedDays(daysOfWeek);
    } else if (value.includes("clear")) {
      setSelectedDays([]);
    } else {
      setSelectedDays(value);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 text-[#3A3A3A]">
      <div className="bg-white rounded-lg p-6 text-2xl flex flex-col gap-6 w-[400px]">
        <button onClick={onClose} className="self-end">
          <MdOutlineCancel size={24} />
        </button>

        <FormControl fullWidth>
          <TextField label="Address" value="" variant="outlined" />
        </FormControl>

        <TimePicker
          label="Break Start Time"
          time={breakStart}
          setTime={setBreakStart}
        />
        <TimePicker
          label="Break End Time"
          time={breakEnd}
          setTime={setBreakEnd}
        />

        <FormControl fullWidth>
          <InputLabel>Days of the week</InputLabel>
          <Select
            multiple
            value={selectedDays}
            onChange={handleDayChange}
            renderValue={(selected) =>
              selected.length === 0 ? "Select Days" : selected.join(", ")
            }
          >
            <MenuItem value="all">
              <Checkbox checked={selectedDays.length === daysOfWeek.length} />
              <ListItemText primary="Select All" />
            </MenuItem>
            <MenuItem value="clear">
              <Checkbox checked={selectedDays.length === 0} />
              <ListItemText primary="Clear" />
            </MenuItem>
            {daysOfWeek.map((day) => (
              <MenuItem key={day} value={day}>
                <Checkbox checked={selectedDays.indexOf(day) > -1} />
                <ListItemText primary={day} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<MdCheckCircleOutline />}
        ></Button>
      </div>
    </div>
  );
};
