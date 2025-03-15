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

const useMenuStore = create((set) => ({
  foodMenu: [],
  wineMenu: [],

  getFoodMenu: () => getFoodMenu(set),
  getWineMenu: () => getWineMenu(set),
}));

export default useMenuStore;
