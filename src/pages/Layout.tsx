import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  const [hideSidebar, setHideSidebar] = useState(true);
  return (
    <>
      <ToastContainer />
      <Sidebar hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
      <main className={`main ${!hideSidebar && "blurred"}`}>
        <Outlet />
      </main>
    </>
  );
}
