import React from "react";
import NoLoginHeader from "../Header/NoLoginHeader";
import { Outlet } from "react-router-dom";

function LogOutNav() {
  return (
    <>
      <NoLoginHeader />
      <Outlet />
    </>
  );
}

export default LogOutNav;
