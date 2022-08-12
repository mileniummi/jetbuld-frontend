import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import useCheckMobileScreen from "@/lib/hooks/useCheckMobileScreen";

export default function Layout() {
  const isMobile = useCheckMobileScreen();
  const [hideSidebar, setHideSidebar] = useState(isMobile);
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
