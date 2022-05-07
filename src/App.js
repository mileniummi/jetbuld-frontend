import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Projects from "./pages/Projects";
import ProjectInfo from "./components/projects/ProjectInfo";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useEffect, useState } from "react";
import { userContext } from "./context";
import Companies from "./pages/Companies";
import Points from "./pages/Points";
import PointPhotos from "./components/points/PointPhotos";
import React from "react"

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user && setUser(user);
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Companies />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/points" element={<Points />} />
          <Route path="/project-info" element={<ProjectInfo />} />
          <Route path="/point-photos" element={<PointPhotos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />}
        </Route>
      </Routes>
    </userContext.Provider>
  );
}
