import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

const useMenuStore = create((set) => ({
  foodMenu: [],
  wineMenu: [],
  tables: [],

  getFoodMenu: async () => {
    try {
      const response = await axiosInstance.get("/profile/food-menu");
      console.log(response)
      set({ foodMenu: response.data.data || [] });
    } catch (error) {
      handleError(error);
    }
  },

  getWineMenu: async () => {
    try {
      const response = await axiosInstance.get("/profile/wine-menu");
      set({ wineMenu: response.data.data || [] });
    } catch (error) {
      handleError(error);
    }
  },

  getTables: async () => {
    try {
      const response = await axiosInstance.get("/profile/tables");
      set({ tables: response.data.data || [] });
    } catch (error) {
      handleError(error);
    }
  },

  updateTables: async (seatingCapacity) => {
    try {
      const response = await axiosInstance.put("/profile/update-tables", {
        seating_capacity: seatingCapacity,
      });
      set({ tables: response.data.data || [] });
      toast.success("Seating capacity updated successfully!");
      await useMenuStore.getState().getTables(); //re-fetch tables
    } catch (error) {
      handleError(error);
    }
  },

  updateFoodMenu: async (menuArray) => {
    try {
      if (!Array.isArray(menuArray) || menuArray.length === 0) {
        toast.error("Menu must be a non-empty array.");
        return;
      }

      const response = await axiosInstance.put("/profile/update-food-menu", {
        menu: menuArray, // Send the array directly
      });

      set({ foodMenu: response.data.data || [] });
      toast.success("Food menu updated successfully!");
      await useMenuStore.getState().getFoodMenu(); // Re-fetch updated menu
    } catch (error) {
      handleError(error);
    }
  },

  updateWineMenu: async (wineMenuArray) => {
    try {
      if (!Array.isArray(wineMenuArray) || wineMenuArray.length === 0) {
        toast.error("Wine menu must be a non-empty array.");
        return;
      }

      const response = await axiosInstance.put("/profile/update-wine-menu", {
        wine_menu: wineMenuArray, // Send the array directly
      });

      set({ wineMenu: response.data.data || [] });
      toast.success("Wine menu updated successfully!");
      await useMenuStore.getState().getWineMenu(); // Re-fetch wine menu
    } catch (error) {
      handleError(error);
    }
  },
}));

export default useMenuStore;
