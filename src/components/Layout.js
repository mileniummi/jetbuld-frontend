import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import React from "react"

export default function Layout(){
    return(
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}