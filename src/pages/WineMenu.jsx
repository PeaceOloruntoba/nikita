import React, { useEffect, useState, useRef } from "react";
import useMenuStore from "../store/useMenuStore";
import Modal from "../components/ui/Modal";

export default function WineMenu() {
  const { wineMenu, getWineMenu, updateWineMenu } = useMenuStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuText, setMenuText] = useState("");
  const [menuFile, setMenuFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getWineMenu();
  }, [getWineMenu]);

  useEffect(() => {
    if (Array.isArray(wineMenu)) {
      setMenuText(wineMenu.join("\n"));
    } else {
      setMenuText("");
    }
  }, [wineMenu]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setMenuFile(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMenuText(Array.isArray(wineMenu) ? wineMenu.join("\n") : "");
    setMenuFile(null);
  };

  const handleTextChange = (e) => {
    setMenuText(e.target.value);
    setMenuFile(null);
  };

  const handleFileChange = (e) => {
    setMenuFile(e.target.files[0]);
    setMenuText("");
  };

  const handleSaveMenu = async () => {
    if (menuFile) {
      console.log("File selected:", menuFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        console.log("File content:", fileContent);
        const newMenuFromFile = fileContent
          .split("\n")
          .filter((item) => item.trim() !== "");
        updateWineMenu(newMenuFromFile);
        handleCloseModal();
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsText(menuFile);
    } else {
      const newMenu = menuText.split("\n").filter((item) => item.trim() !== "");
      updateWineMenu(newMenu);
      handleCloseModal();
    }
  };

  const handleOpenFileDialog = () => {
    fileInputRef.current.click();
  };

  console.log("wineMenu:", wineMenu);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 m-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary mb-4">Wine Menu</h2>
        <button
          className="bg-primary text-white px-6 py-1 rounded cursor-pointer focus:bg-primary/70 active:bg-primary/70"
          onClick={handleOpenModal}
        >
          {Array.isArray(wineMenu) && wineMenu.length > 0
            ? "Update Wine Menu"
            : "Add Wine Menu"}
        </button>
      </div>

      {Array.isArray(wineMenu) && wineMenu.length > 0 ? (
        <ul className="space-y-2">
          {wineMenu.map((item, index) => (
            <li
              key={index}
              className="p-2 border-b border-gray-300 text-gray-800"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No menu items available.</p>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3 className="text-lg font-semibold mb-4">Update Wine Menu</h3>
        <div className="mb-2">
          <button
            onClick={handleOpenFileDialog}
            className="bg-secondary text-primary px-4 py-2 rounded-md mr-2"
          >
            Upload File
          </button>
          <input
            type="file"
            accept=".txt,.pdf,.docx,.doc,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          {menuFile && (
            <span className="text-gray-600 ml-2">{menuFile.name}</span>
          )}
        </div>
        <textarea
          value={menuText}
          onChange={handleTextChange}
          className="w-full h-48 p-2 border rounded-md"
          placeholder="Or enter menu text here..."
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
            onClick={handleSaveMenu}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
