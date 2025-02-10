import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

// Create a new question
const createQuestion = async (set, questionData) => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.post("/questions", questionData);
    toast.success("Question created successfully!");
    await getQuestions(set);
    set({ isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Get all questions
const getQuestions = async (set) => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.get("/questions");
    const data = response?.data?.data || [];
    set({ questions: data, isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Update an existing question
const updateQuestion = async (set, questionId, updatedData) => {
  set({ isLoading: true });
  try {
    const response = await axiosInstance.put(
      `/questions/${questionId}`,
      updatedData
    );
    toast.success("Question updated successfully!");
    await getQuestions(set);
    set({ isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Delete a question
const deleteQuestion = async (set, questionId) => {
  set({ isLoading: true });
  try {
    await axiosInstance.delete(`/questions/${questionId}`);
    toast.success("Question deleted successfully!");
    await getQuestions(set);
    set({ isLoading: false });
  } catch (error) {
    handleError(error);
    set({ isLoading: false });
  }
};

// Zustand Store
const useQuestionStore = create((set) => ({
  questions: [],
  isLoading: false,
  getFeedbacks: () => getFeedbacks(set),
  createQuestion: (questionData) => createQuestion(set, questionData),
  getQuestions: () => getQuestions(set),
  updateQuestion: (questionId, updatedData) =>
    updateQuestion(set, questionId, updatedData),
  deleteQuestion: (questionId) => deleteQuestion(set, questionId),
}));

export default useQuestionStore;
