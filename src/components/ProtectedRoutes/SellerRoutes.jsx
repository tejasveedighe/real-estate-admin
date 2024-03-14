import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData } from "../../utils/auth";

function SellerRoutes() {
  try {
    const { userRole: role } = getUserData();
    if (!role) {
      toast.error("Login to continue");
      return <Navigate to={"/login"} />;
    }
    const isSeller = role === "Seller";
    if (!isSeller) {
      toast.error("Only Seller can access the routes");
      return <Navigate to="/" />;
    }
  } catch (error) {
    toast.error("Unable to authorize ", error.message);
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default SellerRoutes;
