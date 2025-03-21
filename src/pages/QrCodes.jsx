import React, { useEffect, useState } from "react";
import useMenuStore from "../store/useMenuStore";
import QRCode from "react-qr-code";
import Modal from "../components/ui/Modal";
import { jsPDF } from "jspdf";
import qrcode from "qrcode";

export default function QrCodes() {
  const { tables, getTables, updateTables } = useMenuStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seatingCapacity, setSeatingCapacity] = useState("");

  useEffect(() => {
    getTables();
  }, [getTables]);

  useEffect(() => {
    if (tables && Array.isArray(tables) && tables.length > 0) {
      setSeatingCapacity(tables.length.toString());
    } else {
      setSeatingCapacity("");
    }
  }, [tables]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSeatingCapacity = () => {
    updateTables(parseInt(seatingCapacity, 10));
    handleCloseModal();
  };

  const handlePrintQRCode = (qrValue, tableName) => {
    qrcode.toCanvas(qrValue, { width: 512 }, (error, canvas) => {
      if (error) {
        console.error("Error generating QR code:", error);
        return;
      }
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = 200;
      const imageHeight = 200;
      const x = (pageWidth - imageWidth) / 2;
      const y = (pageHeight - imageHeight) / 2 - 20;

      pdf.addImage(imgData, "PNG", x, y, imageWidth, imageHeight);
      pdf.text(tableName, pageWidth / 2, y + imageHeight + 15, {
        align: "center",
      });
      pdf.save(`${tableName}.pdf`);
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 m-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary mb-4">QR Codes</h2>
        <button
          className="bg-primary text-white px-6 py-1 rounded cursor-pointer focus:bg-primary/70 active:bg-primary/70"
          onClick={handleOpenModal}
        >
          Update Tables
        </button>
      </div>

      {tables && Array.isArray(tables) && tables.length === 0 ? (
        <>
          <p className="text-gray-500">No QR codes available.</p>
          <p className="text-gray-500">Go and add some tables in settings.</p>
        </>
      ) : tables && Array.isArray(tables) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tables.map((item) => (
            <div
              key={item?.table_number}
              className="p-4 border border-gray-300 rounded-md text-center"
            >
              <div className="flex flex-col items-center">
                <QRCode
                  value={`profileId=${item.profile_id}&tableNumber=${item.table_number}`}
                  size={128}
                />
                <p className="mt-2 text-lg font-semibold">
                  Table {item.table_number}
                </p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() =>
                    handlePrintQRCode(
                      `profileId=${item.profile_id}&tableNumber=${item.table_number}`,
                      `Table ${item.table_number}`
                    )
                  }
                >
                  Print
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3 className="text-lg font-semibold mb-4">Update Number of Tables</h3>
        <label
          htmlFor="seatingCapacity"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Tables:
        </label>
        <input
          type="number"
          id="seatingCapacity"
          value={seatingCapacity}
          onChange={(e) => setSeatingCapacity(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md mr-2"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={handleSaveSeatingCapacity}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
