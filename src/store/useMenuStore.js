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
      console.log(response);
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

  updateFoodMenu: async (menuText) => {
    // Change parameter to menuText
    try {
      if (!menuText) {
        // Check if menuText is empty
        toast.error("Menu text cannot be empty.");
        return;
      }

      const response = await axiosInstance.put("/profile/update-food-menu", {
        menu_text: menuText, // Send menuText instead of menu array
      });

      set({ foodMenu: response.data.data || [] });
      toast.success("Food menu updated successfully!");
      await useMenuStore.getState().getFoodMenu(); // Re-fetch updated menu
    } catch (error) {
      handleError(error);
    }
  },

  updateWineMenu: async (wineMenuText) => {
    // change parameter to wineMenuText
    try {
      if (!wineMenuText) {
        toast.error("Wine menu text cannot be empty.");
        return;
      }
      const response = await axiosInstance.put("/profile/update-wine-menu", {
        wine_menu_text: wineMenuText, // Send wineMenuText instead of wine_menu array
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
