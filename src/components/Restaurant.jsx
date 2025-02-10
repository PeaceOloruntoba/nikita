import React, { useRef, useState, useEffect } from "react";
import Button from "./shared/Button";
import { MdQrCode } from "react-icons/md";

export function Card({ number, qrCode, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const detailsRef = useRef(null);
  const qrRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      detailsRef.current &&
      !detailsRef.current.contains(event.target) &&
      !event.target.closest(".card")
    ) {
      setShowDetails(false);
    }
    if (
      qrRef.current &&
      !qrRef.current.contains(event.target) &&
      !event.target.closest(".qr-button")
    ) {
      setShowQR(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="bg-white rounded-lg p-4 pb-36 border border-[#D9D9D9] cursor-pointer card"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-center justify-between">
          <span className="text-2xl text-black">{number}</span>
          <Button
            className="bg-primary p-1 px-2 rounded-lg text-white qr-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowQR(true);
            }}
            value={
              <span className="flex items-center gap-2 text-xl font-semibold">
                QR Code <MdQrCode size={18} />
              </span>
            }
          />
        </div>
      </div>
      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90">
          <div ref={qrRef} className="bg-white p-4 rounded-lg">
            <img src={qrCode} alt="QR Code" className="w-64 h-64" />
          </div>
        </div>
      )}
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
          <div
            ref={detailsRef}
            className="p-8 bg-white rounded-lg flex flex-col gap-2"
          >
            <Details onDelete={onDelete} />
          </div>
        </div>
      )}
    </>
  );
}

export function Details({ onDelete }) {
  return (
    <div className="flex flex-col gap-2 text-black">
      {/* Details about the table */}
      <div className="flex flex-col gap-2">
        <span>Name of Person who scanned the QR code</span>
        {/* Table data goes here */}
      </div>
      <div className="flex items-center gap-4">
        {/* Other buttons */}
        <Button
          value={"Delete"}
          className="cursor-pointer py-2 px-3 rounded-lg text-2xl bg-[#F2EBF0] text-black"
          onClick={onDelete} // Trigger delete function
        />
      </div>
    </div>
  );
}
