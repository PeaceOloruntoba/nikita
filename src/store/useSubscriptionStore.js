import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";

const useSubscriptionStore = create((set, get) => ({
  loading: false,
  error: null,

  createSubscription: async (stripeToken, priceId) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.post("/subscription/subscriptions", {
        stripeToken,
        priceId,
      });
      set({ loading: false });
      return response.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },

  getPlanDetails: async (priceId) => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get(
        `/subscription/product-details/${priceId}`
      );
      set({ loading: false });
      return response.data;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || err.message,
      });
      throw err;
    }
  },
}));

export default useSubscriptionStore;
