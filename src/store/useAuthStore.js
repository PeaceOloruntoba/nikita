// useInsightStore.js
import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { handleError } from "../utils/handleError";

const useInsightStore = create((set) => ({
  insights: null,
  loading: false,
  error: null,

  fetchInsights: async (aiAgentId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/ai/insight/`);
      set({ insights: response.data, loading: false });
    } catch (error) {
      handleError(error);
      set({ error: error.message, loading: false });
    }
  },

  clearInsights: () => {
    set({ insights: null, error: null });
  },
}));

export default useInsightStore;
