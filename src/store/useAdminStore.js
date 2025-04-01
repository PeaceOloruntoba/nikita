/* eslint-disable no-unused-vars */
import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

// Fetch feedbacks from API
const getFeedbacks = async (set) => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.get("/admin");
    console.log(response)
    const data = response?.data?.data || [];
    set({ feedbacks: data, isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Zustand Store
const useAdminStore = create((set) => ({
  feedbacks: [],
  isLoading: false,
  getFeedbacks: () => getFeedbacks(set),
}));

export default useAdminStore;
