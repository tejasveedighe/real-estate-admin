import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

export function isLoggedIn() {
  return Cookies.get("userToken") ? true : false;
}

export function getUserData() {
  try {
    if (!isLoggedIn()) return {};
    const token = Cookies.get("userToken");
    const userRole = decodeToken(token).role;
    const userId = Cookies.get("userId");
    const userName = Cookies.get("userName");
    const userEmail = Cookies.get("userEmail");
    return {
      userId,
      userName,
      userEmail,
      userRole,
    };
  } catch (error) {
    return {}
  }
}
