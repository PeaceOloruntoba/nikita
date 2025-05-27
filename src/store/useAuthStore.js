/* eslint-disable no-unused-vars */
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
  localStorage.removeItem("profile");
};

// Authentication Functions
const loginUser = async (user, navigate, set, get) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.post("/auth/login", user);
    const data = response?.data;
    if (!data?.user || !data?.token) {
      throw new Error("Invalid response from server");
    }
    saveAuthDataToLocalStorage(data.user, data.token);
    if (data.user.role === "superadmin") {
      navigate("/admin/dashboard");
    } else if (data.user.role === "admin") {
      if (!data.user.onetimePayment) {
        navigate("/make-payment");
      } else if (data.message === "Please complete your profile setup") {
        navigate("/update-profile");
        toast.warning(data?.message);
      } else {
        navigate("/interface");
      }
    } else {
      navigate("/scanqr");
    }
    set((state) => ({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
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
    const response = await axiosInstance.post("/auth/register", user);
    const data = response?.data;

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
    if (user.role === "user") {
      toast.success("Account created successfully!");
      navigate("/scanqr");
    } else {
      toast.success(
        "Restaurant created successfully! Please make a one-time payment to use our system."
      );
      navigate("/make-payment");
    }
  } catch (error) {
    handleError(error);
    set({ isAuthenticating: false });
  }
};

const updateProfile = async (profileData, navigate, set) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.put("/profile/update", profileData);
    toast.success("Restaurant profile created successfully!");
    navigate("/interface");
  } catch (error) {
    handleError(error);
  } finally {
    set({ isAuthenticating: false });
  }
};

const getProfile = async (set) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.get("/profile/get");
    set((state) => ({
      profile: response.data.data,
    }));
  } catch (error) {
    handleError(error);
  } finally {
    set({ isAuthenticating: false });
  }
};

const getUser = async (set) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.get("/auth/user");
    set((state) => ({
      user: response.data.data,
    }));
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
  navigate("/login");
};

// Zustand Store
const useAuthStore = create((set) => {
  const { user, token } = loadAuthDataFromLocalStorage();

  return {
    user: user || null,
    token: token || null,
    isAuthenticated: !!user,
    isAuthenticating: false,
    profile: {},

    login: (user, navigate) => loginUser(user, navigate, set),
    signUp: (user, navigate) => signUpUser(user, navigate, set),
    logout: (navigate) => logoutUser(navigate, set),
    updateProfile: (profileData, navigate) =>
      updateProfile(profileData, navigate, set),
    getProfile: () => getProfile(set),
    getUser: () => getUser(set),
  };
});

export default useAuthStore;
