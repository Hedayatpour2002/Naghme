"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import apiClient from "@/utils/axiosInstance";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loginUser: (email: string, password: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    username: string,
    phoneNumber: string
  ) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  sendOtp: (emailOrPhone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/api/user")
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          logout();
        });
    }
  }, []);

  const loginUser = async (email: string, password: string): Promise<void> => {
    try {
      const response = await apiClient.get("/user/login", {
        params: { email, password },
      });

      if (response.data.result) {
        const token = response.data.token;

        localStorage.setItem("token", token);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // ----
        // todo
        // ----
        const userResponse = await apiClient.get("/api/user", {
          data: { token },
        });
        setUser(userResponse.data);

        setIsAuthenticated(true);

        router.push("/");
      } else {
        throw new Error(response.data.message || "خطا در ورود به سیستم");
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          console.error("خطای اعتبارسنجی:", data.message);
          throw new Error(data.message || "اطلاعات ورود نامعتبر است.");
        } else if (status === 500) {
          console.error("خطای سرور:", data.message);
          throw new Error(data.message || "مشکلی در سرور رخ داده است.");
        }
      }
      console.error("خطای شبکه یا ناشناخته:", error.message);
      throw new Error(
        "مشکلی در ورود به سیستم رخ داده است. لطفاً دوباره تلاش کنید."
      );
    }
  };

  const loginAdmin = async (email: string, password: string): Promise<void> => {
    try {
      const response = await apiClient.get("/admin/login", {
        params: { email, password },
      });

      if (response.data.result) {
        const token = response.data.token;

        localStorage.setItem("token", token);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const adminResponse = await apiClient.get("/api/admin", {
          data: { token },
        });
        setUser(adminResponse.data);

        setIsAuthenticated(true);

        router.push("/admin/dashboard");
      } else {
        throw new Error(response.data.message || "خطا در ورود به سیستم");
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          console.error("خطای اعتبارسنجی:", data.message);
          throw new Error(data.message || "اطلاعات ورود نامعتبر است.");
        } else if (status === 500) {
          console.error("خطای سرور:", data.message);
          throw new Error(data.message || "مشکلی در سرور رخ داده است.");
        }
      }
      console.error("خطای شبکه یا ناشناخته:", error.message);
      throw new Error(
        "مشکلی در ورود به سیستم رخ داده است. لطفاً دوباره تلاش کنید."
      );
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    phoneNumber: string
  ) => {
    try {
      const response = await apiClient.post("/user/create", {
        email,
        password,
        username,
        phoneNumber,
      });

      if (response.status === 200 && response.data.result) {
        console.log("Registration successful!");
        await loginUser(email, password);
      } else if (response.status === 400) {
        const message = response.data.message || "Validation error";
        console.error("Registration validation failed:", message);
        alert(`خطا در ثبت نام: ${message}`);
      } else {
        console.error("Unknown registration response:", response);
        alert("خطای ناشناخته در ثبت نام. لطفاً دوباره تلاش کنید.");
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        const message = error.response?.data?.message || "Server error";
        console.error("Server error during registration:", message);
        alert(`خطا در سرور: ${message}`);
      } else {
        console.error("Unhandled registration error:", error);
        alert("خطا در ثبت نام. لطفاً اتصال اینترنت خود را بررسی کنید.");
      }
      throw error;
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const response = await axios.put("/api/change-password", {
        oldPassword,
        newPassword,
      });
      console.log("Password changed successfully:", response.data);
    } catch (error) {
      console.error("Password change failed:", error);
      throw error;
    }
  };

  const sendOtp = async (phone: string) => {
    try {
      const response = await axios.post("/api/send-otp", { phone });
      console.log("OTP sent successfully:", response.data);
      alert("کد تایید ارسال شد.");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      throw error;
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      const response = await axios.post("/api/verify-otp", { otp });
      console.log("OTP verified successfully:", response.data);
      alert("کد تایید با موفقیت تایید شد.");
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const response = await axios.post("/api/reset-password", {
        token,
        newPassword,
      });
      console.log("Password reset successfully:", response.data);
      alert("رمز عبور با موفقیت تغییر یافت.");
    } catch (error) {
      console.error("Password reset failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loginUser,
        loginAdmin,
        logout,
        register,
        changePassword,
        resetPassword,
        sendOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth باید درون AuthProvider استفاده شود.");
  }
  return context;
}
