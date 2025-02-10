import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

// Zustand Store for Menu Management
const useMenuStore = create((set) => ({
  categories: [],
  ingredients: [],
  dishes: {},
  isLoading: false,

  getCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/menu/categories");
      set({ categories: response?.data?.data || [], isLoading: false });
    } catch (error) {
      handleError(error);
      set({ isLoading: false });
    }
  },

  createCategory: async (categoryData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(
        "/menu/categories",
        categoryData
      );
      toast.success("Category created successfully!");
      set((state) => ({
        categories: [...state.categories, response?.data?.data],
        isLoading: false,
      }));
    } catch (error) {
      handleError(error);
      set({ isLoading: false });
    }
  },

  deleteCategory: async (categoryId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/menu/categories/${categoryId}`);
      toast.success("Category deleted successfully!");
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== categoryId),
        isLoading: false,
      }));
    } catch (error) {
      handleError(error);
      set({ isLoading: false });
    }
  },

  getIngredients: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/menu/ingredients");
      set({ ingredients: response?.data?.data || [], isLoading: false });
    } catch (error) {
      handleError(error);
      set({ isLoading: false });
    }
  },

  addDishToCategory: async (dishData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/menu/dishes", dishData);
      toast.success("Dish added successfully!");
      set((state) => ({
        dishes: {
          ...state.dishes,
          [dishData.categoryId]: [
            ...(state.dishes[dishData.categoryId] || []),
            response?.data?.data,
          ],
        },
        isLoading: false,
      }));
    } catch (error) {
      handleError(error);
      set({ isLoading: false });
    }
  },

  getCategoryDishes: async (categoryId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(
        `/menu/categories/${categoryId}`
      );
      set((state) => ({
        dishes: { ...state.dishes, [categoryId]: response?.data?.data || [] },
        isLoading: false,
      }));
    } catch (error) {
      handleError(error);
      set({ isLoading: false });
    }
  },

  updateDish: async (dishId, dishData) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.put(
        `/menu/dishes/${dishId}`,
        dishData
      );
      toast.success("Dish updated successfully!");
      set((state) => {
        const updatedDishes = { ...state.dishes };
        Object.keys(updatedDishes).forEach((categoryId) => {
          updatedDishes[categoryId] = updatedDishes[categoryId].map((dish) =>
            dish.id === dishId ? response?.data?.data : dish
          );
        });
        return { dishes: updatedDishes, isLoading: false };
      });
    } catch (error) {
      handleError(error);
      set({ isLoading: false });
    }
  },

  deleteDish: async (dishId, categoryId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/menu/dishes/${dishId}`);
      toast.success("Dish deleted successfully!");
      set((state) => ({
        dishes: {
          ...state.dishes,
          [categoryId]: state.dishes[categoryId].filter(
            (dish) => dish.id !== dishId
          ),
        },
        isLoading: false,
      }));
    } catch (error) {
      handleError(error);
      set({ isLoading: false });
    }
  },
}));

export default useMenuStore;
