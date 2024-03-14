import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import NoLoginHeader from "../Header/NoLoginHeader";
import Sidebar from "../Sidebar/Sidebar";
function LayoutWithNav() {
  return (
    <>
      <NoLoginHeader />
      <div className="d-flex align-items-start">
        <Sidebar />

        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default LayoutWithNav;
