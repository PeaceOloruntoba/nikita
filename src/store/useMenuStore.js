import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

// Fetch food menu
const getFoodMenu = async (set) => {
  try {
    const response = await axiosInstance.get("/profile/food-menu");
    set({ foodMenu: response.data.data || [] });
  } catch (error) {
    handleError(error);
  }
};

// Fetch wine menu
const getWineMenu = async (set) => {
  try {
    const response = await axiosInstance.get("/profile/wine-menu");
    set({ wineMenu: response.data.data || [] });
  } catch (error) {
    handleError(error);
  }
};

// Fetch all tables
const getTables = async (set) => {
  try {
    const response = await axiosInstance.get("/profile/tables");
    set({ tables: response.data.data || [] });
  } catch (error) {
    handleError(error);
  }
};

const useMenuStore = create((set) => ({
  foodMenu: [],
  wineMenu: [],
  tables: [],

  getFoodMenu: () => getFoodMenu(set),
  getWineMenu: () => getWineMenu(set),
  getTables: () => getTables(set),
}));

export default useMenuStore;
