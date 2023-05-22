import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Projects from "./pages/Projects";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Points from "./pages/Points";
import React from "react";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/utils/PrivateRoute";
import "./components/projects/projects.css";
import "./components/UI/forms/forms.css";
import Photos from "./pages/Photos";
import Settings from "./pages/Settings";
import Users from "@/pages/Users";
import Home from "@/pages/Home";
import { AppRoutes } from "@/components/sidebar/utils/app-routes";
import CompanySettingsPage from "@/pages/CompanySettings";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<Points />} />
          <Route path="/point/:id" element={<Photos />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path={AppRoutes.COMPANY_SETTINGS} element={<CompanySettingsPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
