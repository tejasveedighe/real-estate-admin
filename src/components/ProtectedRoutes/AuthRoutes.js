import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../../utils/auth";
import { toast } from "react-toastify";

function AuthRoutes() {
  try {
    const { userRole: role } = getUserData();
    if (!role) {
      toast.error("Login to continue");
      return <Navigate to="/" />;
    }
  } catch (error) {
    toast.error(`Unable to authroize: ${error.message}`);
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default AuthRoutes;
