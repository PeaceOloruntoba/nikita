// useAdminStore.js
import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

// Admin API Functions (Users)
const fetchUsers = async (set) => {
  set({ isAdminRequesting: true });
  try {
    const response = await axiosInstance.post("/admin/users");
    set({ users: response.data.users, isAdminRequesting: false });
  } catch (error) {
    handleError(error);
    set({ isAdminRequesting: false });
  }
};

const fetchUser = async (userId, set) => {
  set({ isAdminRequesting: true });
  try {
    const response = await axiosInstance.post(`/admin/users/${userId}`);
    set({ selectedUser: response.data.user, isAdminRequesting: false });
  } catch (error) {
    handleError(error);
    set({ isAdminRequesting: false });
  }
};

// Admin API Functions (Restaurants)
const fetchRestaurants = async (set) => {
  set({ isAdminRequesting: true });
  try {
    const response = await axiosInstance.post("/admin/restaurants");
    set({ restaurants: response.data.restaurants, isAdminRequesting: false });
  } catch (error) {
    handleError(error);
    set({ isAdminRequesting: false });
  }
};

const fetchRestaurant = async (restaurantId, set) => {
  set({ isAdminRequesting: true });
  try {
    const response = await axiosInstance.post(
      `/admin/restaurants/${restaurantId}`
    );
    set({
      selectedRestaurant: response.data.restaurant,
      isAdminRequesting: false,
    });
  } catch (error) {
    handleError(error);
    set({ isAdminRequesting: false });
  }
};

// Admin API Functions (Dashboard)
const fetchDashboard = async (set) => {
  set({ isAdminRequesting: true });
  try {
    const response = await axiosInstance.post("/admin/dashboard");
    set({ dashboardData: response.data, isAdminRequesting: false });
  } catch (error) {
    handleError(error);
    set({ isAdminRequesting: false });
  }
};

// Zustand Store
const useAdminStore = create((set) => ({
  users: [],
  selectedUser: null,
  restaurants: [],
  selectedRestaurant: null,
  dashboardData: null,
  isAdminRequesting: false,

  getUsers: () => fetchUsers(set),
  getUser: (userId) => fetchUser(userId, set),
  getRestaurants: () => fetchRestaurants(set),
  getRestaurant: (restaurantId) => fetchRestaurant(restaurantId, set),
  getDashboard: () => fetchDashboard(set),
}));

export default useAdminStore;

