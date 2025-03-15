import React, { useEffect } from "react";
import useMenuStore from "../store/useMenuStore";

export default function WineMenu() {
  const { wineMenu, getWineMenu } = useMenuStore();

  useEffect(() => {
    getWineMenu();
  }, [getWineMenu]);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 m-6">
      <h2 className="text-2xl font-semibold text-primary mb-4">Wine Menu</h2>

      {wineMenu.length === 0 ? (
        <p className="text-gray-500">No wine items available.</p>
      ) : (
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
      )}
    </div>
  );
}
