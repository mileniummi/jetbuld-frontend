import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

export default function Layout() {
  const { hideSidebar } = useSelector((state) => state.app);
  return (
    <>
      <ToastContainer />
      <Sidebar />
      <main className={`main ${!hideSidebar && "blurred"}`}>
        <Outlet />
      </main>
    </>
  );
}
