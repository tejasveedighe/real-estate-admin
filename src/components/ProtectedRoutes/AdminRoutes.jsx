import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../../utils/auth";
import { toast } from "react-toastify";

function AdminRoutes() {
  try {
    const { userRole: role } = getUserData();
    if (!role) {
      toast.error("Login to continue");
      return <Navigate to="/" />;
    }
    const isAdmin = role === "Admin";
    if (!isAdmin) {
      toast.error("Only Admin can add properties");
      return <Navigate to="/" />;
    }
  } catch (error) {
    toast.error(`Unable to authroize: ${error.message}`);
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default AdminRoutes;
