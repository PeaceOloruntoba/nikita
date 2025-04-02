// useInsightStore.js
import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { handleError } from "../utils/handleError";

const useInsightStore = create((set, get) => ({
  insights: null,
  loading: false,
  error: null,

  fetchInsights: async (aiAgentId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/ai/insights`);
      set({ insights: response.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      handleError(err);
    }
  },

  clearInsights: () => {
    set({ insights: null, error: null });
  },
}));

export default useInsightStore;
