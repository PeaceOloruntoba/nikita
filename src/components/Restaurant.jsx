import React, { useRef, useState, useEffect } from "react";
import Button from "./shared/Button";
import { MdQrCode } from "react-icons/md";
import { QRCode } from "react-qrcode-logo";

export function Card({ number, qrCode, onDelete, tableName }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const detailsRef = useRef(null);
  const qrRef = useRef(null);
  const qrPrintRef = useRef(null);

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

const handlePrint = () => {
  const originalContents = document.body.innerHTML;
  const printContents = qrPrintRef.current.innerHTML;

  document.body.innerHTML = `
    <div style="
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      justify-content: center; 
      height: 100vh; 
      width: 100vw; 
      text-align: center;
    ">
      <div style="padding: 20px; border: 2px solid black; border-radius: 10px;">
        ${printContents}
      </div>
    </div>
  `;

  window.print();

  setTimeout(() => {
    document.body.innerHTML = originalContents;
    window.location.reload();
  }, 500);
};



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
          <div ref={qrRef} className="bg-white p-8 rounded-lg text-center">
            <div ref={qrPrintRef}>
              <QRCode value={qrCode} />
            </div>
            <Button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={handlePrint}
              value="Print QR Code"
            />
          </div>
        </div>
      )}

      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
          <div
            ref={detailsRef}
            className="p-6 bg-white rounded-lg flex flex-col gap-2"
          >
            <Details
              onDelete={onDelete}
              tableName={tableName}
              number={number}
            />
          </div>
        </div>
      )}
    </>
  );
}

export function Details({ onDelete, tableName, number }) {
  return (
    <div className="flex flex-col gap-8 text-black">
      <div className="flex flex-col gap-2">
        <span className="text-xl">
          Table Name: <span className="font-semibold">{tableName}</span>
        </span>
        <span className="text-xl">
          Capacity: <span className="font-semibold">{number}</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button
          value={"Delete"}
          className="cursor-pointer py-2 px-3 rounded-lg text-lg bg-red-600 text-white/80 w-full"
          onClick={onDelete}
        />
      </div>
    </div>
  );
}
