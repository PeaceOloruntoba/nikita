import React from "react";
import { MdOutlineCancel } from "react-icons/md";

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  message,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 text-black">
      <div className="bg-white rounded-lg p-6 w-1/3 text-lg">
        <div className="flex justify-between items-center mb-4">
          <span>Confirmation</span>
          <MdOutlineCancel
            size={24}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <p>{message}</p>
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 text-white p-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-lg"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
