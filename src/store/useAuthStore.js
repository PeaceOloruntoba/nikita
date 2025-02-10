import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

// Local Storage Helpers
const saveAuthDataToLocalStorage = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const loadAuthDataFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  return { user, token };
};

const clearAuthDataFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Authentication Functions
const loginUser = async (user, navigate, set, get) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.post("/login", user);
    const data = response?.data?.data;

    if (!data?.user || !data?.token) {
      throw new Error("Invalid response from server");
    }
    saveAuthDataToLocalStorage(data.user, data.token);
    set((state) => ({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isAuthenticating: false,
    }));

    toast.success(`Welcome Back! ${data.user.name}`);
    navigate("/feedback");
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
const useAuthStore = create((set) => {
  const { user, token } = loadAuthDataFromLocalStorage(); // Load from localStorage on init

  return {
    user: user || null,
    token: token || null,
    isAuthenticated: !!user, // Authenticated if user exists
    isAuthenticating: false,

    login: (user, navigate) => loginUser(user, navigate, set),
    signUp: (user, navigate) => signUpUser(user, navigate, set),
    logout: (navigate) => logoutUser(navigate, set),
  };
});

export default useAuthStore;
