import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

const useUserStore = create((set) => ({
  isLoading: false,
  restaurantData: null,

  getRestaurant: async (restaurantId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/profile/get/${restaurantId}`);
      set({ restaurantData: response.data });
      return response.data;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  sendChatMessage: async (message, aiAgentId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/chat", {
        message,
        ai_agent_id: aiAgentId,
      });
      return response.data.message;
    } catch (error) {
      handleError(error);
      return "Sorry, something went wrong. Try again!";
    } finally {
      set({ isLoading: false });
    }
  },

  postReview: async (message, restaurantId, type) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/reviews", {
        message,
        restaurant_id: restaurantId,
        type,
      });
      toast.success("Review submitted successfully!");
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
