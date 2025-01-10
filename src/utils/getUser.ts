"use client";
import { jwtDecode } from "jwt-decode";
import getCookie from "@/utils/getCookie";
import useUserStore from "@/stores/userStore";

interface User {
  user_id: number;
  user_name: string;
  email: string;
  contact: boolean;
  role: string;
  iat: number;
  exp: number;
}

function getUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const token = getCookie("token");

  if (!token) {
    console.log("No token found");
    useUserStore.getState().clearUser(); // Clear user state if no token
    return null;
  }

  try {
    const decoded = jwtDecode<User>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      console.log("Token has expired");
      useUserStore.getState().clearUser(); // Clear user state if token expired
      return null;
    }
    useUserStore.getState().setUser(decoded); // Update user state
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    useUserStore.getState().clearUser(); // Clear user state on error
    return null;
  }
}

export default getUser;
