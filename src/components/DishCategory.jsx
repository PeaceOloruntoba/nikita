import React, { useState, useEffect } from "react";
import Button from "./shared/Button";
import useMenuStore from "../store/useMenuStore";
import {
  MdOutlineCancel,
  MdCheckCircleOutline,
  MdModeEdit,
} from "react-icons/md";
import ConfirmationModal from "./shared/ConfirmationModal";

export function DishCategory() {
  const {
    selectedCategory,
    dishes,
    getCategoryDishes,
    addDishToCategory,
    updateDish,
    deleteDish,
  } = useMenuStore();

  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);
  const [openEditDishModal, setOpenEditDishModal] = useState(false);
  const [dishToEdit, setDishToEdit] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      getCategoryDishes(selectedCategory.id);
    }
  }, [selectedCategory, getCategoryDishes]);

  const handleAddDish = () => {
    if (dishName && dishPrice && selectedCategory) {
      addDishToCategory(selectedCategory.id, {
        name: dishName,
        price: dishPrice,
      });
      setDishName("");
      setDishPrice("");
    }
  };

//   console.log(dishes)

  const handleEditDish = () => {
    if (dishToEdit && dishName && dishPrice) {
      updateDish(dishToEdit.id, { name: dishName, price: dishPrice });
      setOpenEditDishModal(false);
      setDishName("");
      setDishPrice("");
    }
  };

  const handleDeleteDish = () => {
    if (dishToDelete) {
      deleteDish(dishToDelete.id);
      setOpenConfirmationModal(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 h-full text-lg flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-2 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Add Dish"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
        />
        <input
          type="number"
          className="border-none outline outline-[#4895E5]/20 p-2 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Dish Price"
          value={dishPrice}
          onChange={(e) => setDishPrice(e.target.value)}
        />
        <Button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
          value={<MdCheckCircleOutline size={18} />}
          onClick={handleAddDish}
        />
      </div>
      <hr />
      {/* <div className="flex flex-col gap-3">
        {dishes?.map((dish) => (
          <div key={dish.id} className="flex items-center gap-6">
            <div className="p-2 w-full">{dish.name}</div>
            <div className="p-2 w-full">${dish.price}</div>
            <Button
              className="cursor-pointer bg-[#AAAFB6] text-white p-3 rounded-lg"
              value={<MdModeEdit size={18} />}
              onClick={() => {
                setDishToEdit(dish);
                setDishName(dish.name);
                setDishPrice(dish.price);
                setOpenEditDishModal(true);
              }}
            />
            <Button
              className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
              value={<MdOutlineCancel size={18} />}
              onClick={() => {
                setDishToDelete(dish);
                setOpenConfirmationModal(true);
              }}
            />
          </div>
        ))}
      </div> */}

      {/* Edit Dish Modal */}
      {openEditDishModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-1/3 text-lg">
            <div className="flex justify-between items-center mb-4">
              <span>Edit Dish</span>
              <MdOutlineCancel
                size={24}
                className="cursor-pointer"
                onClick={() => setOpenEditDishModal(false)}
              />
            </div>
            <input
              type="text"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              className="border-none outline outline-[#4895E5]/20 p-2 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5] mb-4"
              placeholder="Dish Name"
            />
            <input
              type="number"
              value={dishPrice}
              onChange={(e) => setDishPrice(e.target.value)}
              className="border-none outline outline-[#4895E5]/20 p-2 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5] mb-4"
              placeholder="Dish Price"
            />
            <div className="flex justify-between mt-4">
              <button
                className="bg-gray-300 text-white p-2 rounded-lg"
                onClick={() => setOpenEditDishModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded-lg"
                onClick={handleEditDish}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        onConfirm={handleDeleteDish}
        message="Are you sure you want to delete this dish?"
      />
    </div>
  );
}
