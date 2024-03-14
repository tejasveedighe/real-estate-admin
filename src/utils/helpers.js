import axios from "axios";
import Cookies from "js-cookie";
import { URL } from "./constants";
export const Axios = axios.create({
  baseURL: URL,
});

Axios.interceptors.request.use(
  (config) => {
    const userToken = Cookies.get("userToken");
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function isValidEmail(email) {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isObjectNotEmpty(obj) {
  return typeof obj === "object" && Object.keys(obj).length > 0;
}
