import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

const getFeedbacks = async (set) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.post("/feedbacks");
    console.log(response);
    const data = response?.data;
    set((state) => ({
      feedbacks: data,
      isAuthenticating: false,
    }));
  } catch (error) {
    handleError(error);
    set({ isAuthenticating: false });
  }
};

// Zustand Store
const useAdminStore = create((set) => {

  return {
    feedbacks: feedbacks || {},
    getFeedbacks: () => getFeedbacks(set),
  };
});

export default useAdminStore;
