import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <>
      <ToastContainer />
      <Sidebar />
      <div className="custom-scroll">
        <Outlet />
      </div>
    </>
  );
}
