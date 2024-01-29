import Navbar from "./Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" bg-[#FFFFFF] min-h-screen min-w-screen">
      <Navbar />
      <div className="pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
