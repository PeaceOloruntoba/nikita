import React, { useEffect, useState } from "react";
import useMenuStore from "../store/useMenuStore";
import Modal from "../components/ui/Modal";

export default function FoodMenu() {
  const { foodMenu, getFoodMenu, updateFoodMenu } = useMenuStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuText, setMenuText] = useState("");

  useEffect(() => {
    getFoodMenu();
  }, [getFoodMenu]);

useEffect(() => {
  console.log("foodMenu:", foodMenu);
  if (Array.isArray(foodMenu) && foodMenu.length > 0) {
    setMenuText(foodMenu.join("\n"));
  } else {
    setMenuText("");
  }
}, [foodMenu]);

console.log(foodMenu)


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveMenu = () => {
    const newMenu = menuText.split("\n").filter((item) => item.trim() !== "");
    updateFoodMenu(newMenu);
    handleCloseModal();
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 m-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary mb-4">Food Menu</h2>
        <button
          className="bg-primary text-white px-6 py-1 rounded cursor-pointer focus:bg-primary/70 active:bg-primary/70"
          onClick={handleOpenModal}
        >
          {foodMenu && foodMenu.length > 0
            ? "Update Food Menu"
            : "Add Food Menu"}
        </button>
      </div>

      {Array.isArray(foodMenu) && foodMenu.length > 0 ? (
        <ul className="space-y-2">
          {foodMenu.map((item, index) => (
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
        <h3 className="text-lg font-semibold mb-4">Food Menu</h3>
        <textarea
          value={menuText}
          onChange={(e) => setMenuText(e.target.value)}
          className="w-full h-48 p-2 border rounded-md"
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
