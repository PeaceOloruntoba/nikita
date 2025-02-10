import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

// Create a new table
const createTable = async (set, tableData) => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.post("/restaurant/tables", {
      name: tableData.name,
      description: tableData.description,
      capacity: tableData.capacity,
    });
    toast.success("Table created successfully!");
    await getTables(set); // Refresh tables list after creation
    set({ isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Get all tables
const getTables = async (set) => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.get("/restaurant/tables");
    const data = response?.data?.data || [];
    console.log(response);
    set({ tables: data, isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Delete a table
const deleteTable = async (set, tableId) => {
  set({ isLoading: true });
  try {
    await axiosInstance.delete(`/restaurant/tables/${tableId}`);
    toast.success("Table deleted successfully!");
    await getTables(set);
    set({ isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Zustand Store
const useRestaurantStore = create((set) => ({
  tables: [],
  isLoading: false,
  getTables: () => getTables(set),
  createTable: (tableData) => createTable(set, tableData),
  deleteTable: (tableId) => deleteTable(set, tableId),
}));

export default useRestaurantStore;
