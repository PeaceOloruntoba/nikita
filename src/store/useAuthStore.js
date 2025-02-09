import { create } from "zustand";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import { handleError } from "../utils/handleError";

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

const loginUser = async (user, openOtpModal, navigate, set) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.post("/auth/signin", user);
    const data = response?.data?.data;
    set((state) => ({
      ...state,
      user: data?.user,
      token: data?.token,
      isAuthenticated: true,
    }));
    // Save to localStorage
    saveAuthDataToLocalStorage(data?.user, data?.token);
    toast.success(`Welcome Back! ${data?.user?.firstName}`);

    if (data?.user?.roles?.includes("admin")) {
      navigate("/admin");
    } else if (data?.user?.roles?.includes("vendor")) {
      navigate("/vendor");
    } else {
      navigate("/user");
    }
  } catch (error) {
    const { response } = error;
    if (response?.data?.message.startsWith("Email")) {
      openOtpModal();
    }
    handleError(error);
  } finally {
    set({ isAuthenticating: false });
  }
};

const signUpUser = async (user, navigate, set) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.post(`/register?for-admin=1`, user);
    toast.success(response?.message);
    toast.success("Please Login!")
    navigate("/login")
  } catch (error) {
    handleError(error);
  } finally {
    set({ isAuthenticating: false });
  }
};

const verifyOtp = async (otpData, closeOtpModal, navigate, set) => {
  set({ isAuthenticating: true });
  try {
    const response = await axiosInstance.post("/auth/verify-otp", otpData);
    const data = response?.data?.data;
    toast.success(data?.message);
    closeOtpModal();
    toast.success("Now login");
    navigate("/login");
  } catch (error) {
    console.error(error);
    handleError(error);
  } finally {
    set({ isAuthenticating: false });
  }
};

const resendOtp = async (user, set) => {
  set({ isAuthenticating: true });
  try {
    console.log(user);
    const { data } = await axiosInstance.post("/auth/send-otp", {
      email: user,
    });
    toast.success("OTP sent successfully");
  } catch (error) {
    handleError(error);
  } finally {
    set({ isAuthenticating: false });
  }
};

const getUser = async (navigate, set) => {
  set({ isValidating: true });
  try {
    const {
      data: { data },
    } = await axiosInstance.get("/auth");
    set({ isAuthenticated: true });
  } catch (error) {
    console.error("Error validating user" + error);
    clearAuthDataFromLocalStorage();
    // toast.error("Please log in", { id: "unique" });
    navigate("/login");
  } finally {
    set({ isValidating: false });
  }
};

const logoutUser = (navigate, set, get) => {
  set({ user: null, isAuthenticated: false });
  clearAuthDataFromLocalStorage();
  navigate("/");
  toast.success(`Logged out successfully!`);
};

const useAuthStore = create((set, get) => {
  const { user, token } = loadAuthDataFromLocalStorage(); // Load user and token from localStorage at initialization

  return {
    user: user || null,
    token: token || null,
    getToken: () => localStorage.getItem("token") ?? null,
    isAuthenticated: !!user, // Initialize authentication based on localStorage
    isAuthenticating: false,
    isValidating: () => (get().getToken() ? true : false),
    login: (user, openOtpModal, navigate) =>
      loginUser(user, openOtpModal, navigate, set),
    signUp: (user, navigate) => signUpUser(user, navigate, set),
    verifyOtp: (data, closeOtpModal, navigate) =>
      verifyOtp(data, closeOtpModal, navigate, set),
    resendOtp: (user) => resendOtp(user, set),
    logout: (navigate) => logoutUser(navigate, set),
    getUser: (navigate) => getUser(navigate, set),
  };
});

export default useAuthStore;
