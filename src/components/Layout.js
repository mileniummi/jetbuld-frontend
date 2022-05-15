import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <>
      <ToastContainer />
      <Sidebar />
      <Outlet />
    </>
  );
}
