import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

// Fetch all categories
const getCategories = async (set) => {
  try {
    const response = await axiosInstance.get("/menu/categories");
    set({ categories: response.data.data || [] });
  } catch (error) {
    handleError(error);
  }
};

// Create new category
const createCategory = async (categoryName, set) => {
  try {
    const response = await axiosInstance.post("/menu/categories", {
      name: categoryName,
    });
    set({ categories: [...set.categories, response.data.data] });
    toast.success("Category added successfully!");
  } catch (error) {
    handleError(error);
  }
};

// Delete a category
const deleteCategory = async (categoryId, set) => {
  try {
    await axiosInstance.delete(`/menu/categories/${categoryId}`);
    set({
      categories: set.categories.filter(
        (category) => category.id !== categoryId
      ),
    });
    toast.success("Category deleted successfully!");
  } catch (error) {
    handleError(error);
  }
};

// Fetch dishes for a specific category
const getCategoryDishes = async (categoryId, set) => {
  try {
    const response = await axiosInstance.get(`/menu/categories/${categoryId}`);
    set({ dishes: response.data.data || [] });
  } catch (error) {
    handleError(error);
  }
};

// Add a new dish to a category
const addDishToCategory = async (categoryId, dish, set) => {
  try {
    const response = await axiosInstance.post(`/menu/dishes`, {
      ...dish,
      categoryId,
    });
    set({ dishes: [...set.dishes, response.data.data] });
    toast.success("Dish added successfully!");
  } catch (error) {
    handleError(error);
  }
};

// Update an existing dish
const updateDish = async (dishId, updatedDish, set) => {
  try {
    await axiosInstance.put(`/menu/dishes/${dishId}`, updatedDish);
    set({
      dishes: set.dishes.map((dish) =>
        dish.id === dishId ? { ...dish, ...updatedDish } : dish
      ),
    });
    toast.success("Dish updated successfully!");
  } catch (error) {
    handleError(error);
  }
};

// Delete a dish
const deleteDish = async (dishId, set) => {
  try {
    await axiosInstance.delete(`/menu/dishes/${dishId}`);
    set({ dishes: set.dishes.filter((dish) => dish.id !== dishId) });
    toast.success("Dish deleted successfully!");
  } catch (error) {
    handleError(error);
  }
};

const useMenuStore = create((set) => ({
  categories: [],
  dishes: [],
  isLoading: false,
  selectedCategory: null,

  getCategories: () => getCategories(set),
  createCategory: (categoryName) => createCategory(categoryName, set),
  deleteCategory: (categoryId) => deleteCategory(categoryId, set),
  getCategoryDishes: (categoryId) => getCategoryDishes(categoryId, set),
  addDishToCategory: (categoryId, dish) =>
    addDishToCategory(categoryId, dish, set),
  updateDish: (dishId, updatedDish) => updateDish(dishId, updatedDish, set),
  deleteDish: (dishId) => deleteDish(dishId, set),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useMenuStore;
