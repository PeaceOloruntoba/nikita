import create from "zustand";
import axios from "../utils/axios";

const useSubscriptionStore = create((set, get) => ({
  loading: false,
  error: null,

  createSubscription: async (stripeToken, priceId) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post("/subscription/subscriptions", {
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
      const response = await axios.get(
        `/subscription/plan-details/${priceId}`
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
