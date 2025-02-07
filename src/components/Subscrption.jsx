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
    className="bg-white p-6 flex flex-col items-center justify-between h-[250px] rounded-lg"
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

// 🟢 Edit Subscription Modal Component
export const EditSubscription = ({
  onClose,
  breakStart,
  setBreakStart,
  breakEnd,
  setBreakEnd,
  days,
  setDays,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 text-2xl flex flex-col gap-6 w-[400px]">
        <button onClick={onClose} className="self-end text-gray-600">
          <MdOutlineCancel size={24} />
        </button>

        {/* Address Input */}
        <div className="flex flex-col">
          <label>Address</label>
          <input
            type="text"
            className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
            placeholder="Enter Address"
          />
        </div>

        {/* Time Pickers */}
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

        {/* Multi-Select Dropdown */}
        <MultiSelectDropdownForm days={days} setDays={setDays} />

        {/* Save Button */}
        <button className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center justify-center">
          <MdCheckCircleOutline size={18} /> Save
        </button>
      </div>
    </div>
  );
};

// 🟢 Multi-Select Dropdown Component
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const MultiSelectDropdownForm = () => {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDays(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <FormControl fullWidth margin="normal">
        <InputLabel>Address</InputLabel>
        <TextField
          value="Bruchhausenerstraße 36 59759 Arnsberg Deutschland NRW"
          variant="outlined"
          disabled
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Break Start Time</InputLabel>
        <TextField type="time" defaultValue="10:00" variant="outlined" />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Break End Time</InputLabel>
        <TextField type="time" defaultValue="10:15" variant="outlined" />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Days of the week</InputLabel>
        <Select
          multiple
          value={selectedDays}
          onChange={handleChange}
          renderValue={(selected) =>
            selected.length === 0 ? "Select Days" : selected.join(", ")
          }
        >
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
        style={{ marginTop: "20px" }}
      >
        ✔
      </Button>
    </div>
  );
};

// 🟢 Time Picker Modal Component
export const TimePicker = ({ label, time, setTime }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("AM");

  const handleSave = () => {
    setTime(`${hour}:${minute} ${period}`);
    setShowPicker(false);
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <button
        onClick={() => setShowPicker(true)}
        className="border p-3 rounded-lg w-full text-left"
      >
        {time || "Select Time"}
      </button>

      {showPicker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Enter Time</h2>

            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                placeholder="HH"
                className="border p-2 rounded w-16 text-center"
              />
              <span>:</span>
              <input
                type="number"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                placeholder="MM"
                className="border p-2 rounded w-16 text-center"
              />
              <div className="flex flex-col">
                <button
                  onClick={() => setPeriod("AM")}
                  className={`p-2 ${period === "AM" ? "bg-gray-200" : ""}`}
                >
                  AM
                </button>
                <button
                  onClick={() => setPeriod("PM")}
                  className={`p-2 ${period === "PM" ? "bg-gray-200" : ""}`}
                >
                  PM
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowPicker(false)}
                className="text-red-500"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="text-green-500">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
