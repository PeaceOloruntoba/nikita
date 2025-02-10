import React, { useEffect, useState } from "react";
import Button from "./shared/Button";
import useMenuStore from "../store/useMenuStore";
import {
  MdOutlineCancel,
  MdCheckCircleOutline,
  MdModeEdit,
} from "react-icons/md";
import ConfirmationModal from "./shared/ConfirmationModal";

export function MenuCategory() {
  const {
    categories,
    getCategories,
    createCategory,
    deleteCategory,
    setSelectedCategory,
  } = useMenuStore();

  const [categoryName, setCategoryName] = useState("");
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddCategory = () => {
    if (categoryName) {
      createCategory(categoryName);
      setCategoryName("");
    }
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      setOpenConfirmationModal(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 h-full text-lg flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-2 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Add Category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <Button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
          value={<MdCheckCircleOutline size={18} />}
          onClick={handleAddCategory}
        />
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-6">
            <div
              className={`p-2 w-full cursor-pointer ${
                category.isSelected ? "bg-gray-300" : ""
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category.name}
            </div>
            {category.isSelected && (
              <>
                <Button
                  className="cursor-pointer bg-[#AAAFB6] text-white p-3 rounded-lg"
                  value={<MdModeEdit size={18} />}
                />
                <Button
                  className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
                  value={<MdOutlineCancel size={18} />}
                  onClick={() => {
                    setCategoryToDelete(category);
                    setOpenConfirmationModal(true);
                  }}
                />
              </>
            )}
          </div>
        ))}
      </div>
      <ConfirmationModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        onConfirm={handleDeleteCategory}
        message="Are you sure you want to delete this category?"
      />
    </div>
  );
}
