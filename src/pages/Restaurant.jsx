import React, { useState } from "react";
import Button from "../components/shared/Button";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Card } from "../components/Restaurant";
import useRestaurantStore from "../store/useRestaurantStore";

export default function Restaurant() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTable, setNewTable] = useState({
    name: "",
    description: "",
    capacity: "",
  });

  const { tables, createTable, isLoading } = useRestaurantStore();

  const handleCreateTable = () => {
    createTable(newTable);
    setShowCreateModal(false);
  };
  console.log(tables)

  return (
    <div className="w-full h-full flex flex-col items-center p-8 gap-8">
      <div className="flex w-full items-end justify-end">
        <Button
          className="cursor-pointer bg-[#4895E5] text-white px-3 py-1 rounded-lg"
          value={
            <span className="flex gap-2 items-center justify-center text-xl font-semibold">
              <MdOutlineAddCircleOutline size={18} /> Add Table
            </span>
          }
          onClick={() => setShowCreateModal(true)}
        />
      </div>
      <div className="grid grid-cols-4 gap-8 w-full">
        {tables?.map((data) => (
          <Card
            number={data?.capacity}
            key={data?.id}
            qrCode={data?.id}
            tableName={data?.name}
          />
        ))}
      </div>
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 text-black">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Create New Table</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Table Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={newTable.name}
                onChange={(e) =>
                  setNewTable({ ...newTable, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                value={newTable.description}
                onChange={(e) =>
                  setNewTable({ ...newTable, description: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Capacity</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={newTable.capacity}
                onChange={(e) =>
                  setNewTable({ ...newTable, capacity: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                className="py-2 px-4 bg-gray-500 text-white rounded-lg"
                value="Cancel"
                onClick={() => setShowCreateModal(false)}
              />
              <Button
                className="py-2 px-4 bg-primary text-white rounded-lg"
                value="Create"
                onClick={handleCreateTable}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
