import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

// Create a new question
const createTable = async (set, tableData) => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.post("/restaurant/tables", tableData);
    toast.success("Question created successfully!");
    await getTables(set);
    set({ isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Get all questions
const getTables = async (set) => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.get("/restaurant/tables");
    const data = response?.data?.data || [];
    console.log(response);
    set({ questions: data, isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Delete a question
const deleteQuestion = async (set, tableId) => {
  set({ isLoading: true });
  try {
    await axiosInstance.delete(`/restaurant/tables/${tableId}`);
    toast.success("Question deleted successfully!");
    await getTables(set);
    set({ isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Select a question
const selectQuestion = (set, question) => {
  set({ selectedQuestion: question });
};

// Deselect the question
const deselectQuestion = (set) => {
  set({ selectedQuestion: null });
};

// Zustand Store
const useQuestionStore = create((set) => ({
  questions: [],
  selectedQuestion: null,
  isLoading: false,
  getTables: () => getTables(set),
  createTable: (tableData) => createTable(set, tableData),
  deleteQuestion: (tableId) => deleteQuestion(set, tableId),
  selectQuestion: (question) => selectQuestion(set, question),
  deselectQuestion: () => deselectQuestion(set),
}));

export default useQuestionStore;
