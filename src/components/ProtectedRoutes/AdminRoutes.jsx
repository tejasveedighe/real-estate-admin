import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserData } from "../../utils/auth";

function AdminRoutes() {
  try {
    const { userRole: role } = getUserData();
    if (!role) {
      toast.error("Login to continue");
      return <Navigate to="/login" />;
    }
    const isAdmin = role === "Admin";
    if (!isAdmin) {
      toast.error("Only Admin can add properties");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    toast.error(`Unable to authroize: ${error.message}`);
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default AdminRoutes;
