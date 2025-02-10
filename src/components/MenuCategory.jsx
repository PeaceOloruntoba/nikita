import { useState, useEffect } from "react";
import useMenuStore from "../store/useMenuStore";
import Button from "./shared/Button";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md";
import ConfirmationModal from "./shared/ConfirmationModal";

export function MenuCategory() {
  const {
    categories,
    selectedCategory,
    getCategories,
    setSelectedCategory,
    createCategory,
    deleteCategory,
  } = useMenuStore();

  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handlecreateCategory = () => {
    if (newCategory.trim()) {
      setIsModalOpen(true); // Show confirmation modal
    }
  };

  const handleConfirmcreateCategory = () => {
    createCategory(newCategory);
    getCategories();
    setNewCategory(""); // Clear input after adding
    setIsModalOpen(false); // Close modal
  };

  const handleDeleteCategory = (categoryId) => {
    setCategoryToDelete(categoryId); // Set category to delete
    setIsModalOpen(true); // Show confirmation modal
  };

  const handleConfirmDeleteCategory = () => {
    deleteCategory(categoryToDelete);
    setCategoryToDelete(null); // Reset category to delete
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="bg-white rounded-lg p-4 h-full text-lg flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-2 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Add Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
          value={<MdCheckCircleOutline size={18} />}
          onClick={handlecreateCategory}
        />
      </div>
      <hr />
      {categories.map((category) => (
        <div
          key={category.id}
          className={`flex items-center gap-6 p-2 cursor-pointer ${
            selectedCategory?.id === category.id ? "bg-gray-200" : ""
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          <span className="text-[#3A3A3A]">{category.name}</span>
          {selectedCategory?.id === category.id && (
            <Button
              className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
              value={<MdOutlineCancel size={18} />}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering category click when clicking delete
                handleDeleteCategory(category.id);
              }}
            />
          )}
        </div>
      ))}

      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={
          categoryToDelete
            ? handleConfirmDeleteCategory
            : handleConfirmcreateCategory
        }
        message={
          categoryToDelete
            ? "Are you sure you want to delete this category?"
            : "Are you sure you want to add this category?"
        }
      />
    </div>
  );
}
