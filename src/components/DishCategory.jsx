import React, { useState, useEffect } from "react";
import Button from "./shared/Button";
import {
  MdOutlineCancel,
  MdCheckCircleOutline,
  MdOutlineAddCircleOutline,
  MdModeEdit,
} from "react-icons/md";
import { PiWarningCircleThin } from "react-icons/pi";
import useMenuStore from "../store/useMenuStore";

export function DishCategory() {
  const {
    categories,
    dishes,
    selectedCategory,
    getCategoryDishes,
    deleteDish,
    getIngredients,
    filterIngredients,
    ingredients,
    filteredIngredients,
  } = useMenuStore();
  const handleSearchIngredients = (event) => {
    filterIngredients(event.target.value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  useEffect(() => {
    getCategoryDishes(selectedCategory?.id);
  }, [selectedCategory, getCategoryDishes]);

  const handleDishSelection = (dish) => {
    setSelectedDish(dish);
  };

  const handleDeleteDish = () => {
    if (selectedDish) {
      deleteDish(selectedDish.id, selectedCategory.id);
      setSelectedDish(null);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 h-full text-2xl flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <Button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg"
          value={<MdOutlineAddCircleOutline size={18} />}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <hr />
      {/* <div className="flex flex-col gap-6">
        {dishes?.length > 0 ? (
          dishes?.map((dish) => (
            <div key={dish.id} className="flex items-center gap-6">
              <input
                type="text"
                className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
                placeholder={dish.name}
                value={dish.name}
                disabled
                onClick={() => handleDishSelection(dish)}
              />
              {selectedDish && selectedDish.id === dish.id && (
                <>
                  <Button
                    className="cursor-pointer bg-[#AAAFB6] text-white p-3 rounded-lg"
                    value={<MdModeEdit size={18} />}
                    onClick={() => setIsEditOpen(true)}
                  />
                  <Button
                    className="cursor-pointer bg-[#D92C4A] text-white p-3 rounded-lg"
                    value={<MdOutlineCancel size={18} />}
                    onClick={handleDeleteDish}
                  />
                </>
              )}
            </div>
          ))
        ) : (
          <div>No dishes found for this category</div>
        )}
      </div> */}
      {isModalOpen && (
        <AddDishCategory
          categoryId={selectedCategory?.id}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isEditOpen && (
        <EditDishCategory
          categoryId={selectedCategory?.id}
          dish={selectedDish}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
}

export function AddDishCategory({ categoryId, onClose }) {
  const handleSearchIngredients = (event) => {
    filterIngredients(event.target.value);
  };
  const [dishName, setDishName] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const { filterIngredients, ingredients, addDishToCategory } = useMenuStore();

  console.log(ingredients)

  const handleSubmit = () => {
    const newDish = {
      name: dishName,
      ingredients: selectedIngredients,
      category_id: categoryId, // Pass the category ID here
    };

    addDishToCategory(newDish); // Add the new dish
    onClose(); // Close the modal after submission
  };

  const handleIngredientToggle = (ingredientId) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 text-lg flex flex-col gap-6 w-1/3 h-4/5">
        <button onClick={onClose} className="self-end text-gray-600">
          <MdOutlineCancel size={20} />
        </button>
        <input
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Dish Name"
        />
        <div className="bg-[#D02C46] p-2 rounded-lg flex items-center justify-center text-white">
          <span className="text-white p-12">
            <PiWarningCircleThin size={26} />
          </span>
          <span className="text-sm">
            Achtung: Bitte wählen Sie alle Ihre Allergien aus, um
            sicherzustellen, dass Ihren Gästen keine falschen Gerichte
            vorgeschlagen werden.
          </span>
        </div>
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Search ingredient"
          onChange={handleSearchIngredients}
        />
        <hr />
        <ul className="flex flex-col items-center gap-4 text-[#3A3A3A] w-full h-full overflow-y-auto">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex items-center justify-between w-full px-2"
              >
                <span>{ingredient.name}</span>
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient.id)}
                  onChange={() => handleIngredientToggle(ingredient.id)}
                />
              </li>
            ))
          ) : (
            <div>No ingredients found</div>
          )}
        </ul>
        <button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center justify-center"
          onClick={handleSubmit}
        >
          <MdCheckCircleOutline size={18} />
          Add Dish
        </button>
      </div>
    </div>
  );
}

export function EditDishCategory({ categoryId, dish, onClose }) {
  const [dishName, setDishName] = useState(dish.name);
  const [selectedIngredients, setSelectedIngredients] = useState(
    dish.ingredients || []
  );
  const handleSearchIngredients = (event) => {
    filterIngredients(event.target.value);
  };

  const { filterIngredients, ingredients, updateDish } = useMenuStore();

  const handleSubmit = () => {
    const updatedDish = {
      name: dishName,
      ingredients: selectedIngredients,
      categoryId: categoryId, // Pass the category ID here
    };

    updateDish(dish.id, updatedDish); // Pass the dish ID for update
    onClose(); // Close the modal after update
  };

  const handleIngredientToggle = (ingredientId) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 text-lg flex flex-col gap-6 w-1/3 h-4/5">
        <button onClick={onClose} className="self-end text-gray-600">
          <MdOutlineCancel size={24} />
        </button>
        <input
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="border-none outline outline-[#4895E5]/20 p-2 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Dish Name"
        />
        <div className="bg-[#D02C46] p-2 rounded-lg flex items-center justify-center text-white">
          <span className="text-white p-12">
            <PiWarningCircleThin size={30} />
          </span>
          <span className="text-sm">
            Achtung: Bitte wählen Sie alle Ihre Allergien aus, um
            sicherzustellen, dass Ihren Gästen keine falschen Gerichte
            vorgeschlagen werden.
          </span>
        </div>
        <input
          type="text"
          className="border-none outline outline-[#4895E5]/20 p-3 rounded-lg w-full text-[#3A3A3A] focus:outline-[#4895E5]"
          placeholder="Search ingredient"
          onChange={handleSearchIngredients}
        />
        <hr />
        <ul className="flex flex-col items-center gap-4 text-[#3A3A3A] w-full h-full">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex items-center justify-between w-full px-2"
              >
                <span>{ingredient.name}</span>
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient.id)}
                  onChange={() => handleIngredientToggle(ingredient.id)}
                />
              </li>
            ))
          ) : (
            <div>No ingredients found</div>
          )}
        </ul>
        <button
          className="cursor-pointer bg-[#4895E5] text-white p-3 rounded-lg w-full flex items-center justify-center"
          onClick={handleSubmit}
        >
          <MdCheckCircleOutline size={18} />
          Update Dish
        </button>
      </div>
    </div>
  );
}
