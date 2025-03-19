import React, { useEffect } from "react";
import useMenuStore from "../store/useMenuStore";

export default function FoodMenu() {
  const { foodMenu, getFoodMenu } = useMenuStore();

  useEffect(() => {
    getFoodMenu();
  }, [getFoodMenu]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 m-6">
      <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-primary mb-4">Food Menu</h2>
      <button className="bg-primary text-white px-6 py-1 rounded cursor-pointer focus:bg-primary/70 active:bg-primary/70 ">{foodMenu.length === 0 ? "Add Food Menu" : "Update Food Menu"}</button>
      </div>

      {foodMenu.length === 0 ? (
        <p className="text-gray-500">No menu items available.</p>
      ) : (
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
      )}
    </div>
  );
}
