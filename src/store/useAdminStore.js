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

const signUpUser = async (user, navigate, set) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.post("/register?for-admin=1", user);
    toast.success("Account created successfully! Please login.");
    navigate("/login");
  } catch (error) {
    handleError(error);
  } finally {
    set({ isAuthenticating: false });
  }
};

const logoutUser = (navigate, set) => {
  clearAuthDataFromLocalStorage();
  set({ user: null, token: null, isAuthenticated: false });
  toast.success("Logged out successfully!");
  navigate("/");
};

// Zustand Store
const useAdminStore = create((set) => {
  const { user, token } = loadAuthDataFromLocalStorage();

  return {
    user: user || null,
    token: token || null,
    isAuthenticating: false,

    login: (user, navigate) => loginUser(user, navigate, set),
    getFeedbacks: () => getFeedbacks(set),
    signUp: (user, navigate) => signUpUser(user, navigate, set),
  };
});

export default useAdminStore;
