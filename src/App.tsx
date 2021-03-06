import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Projects from "./pages/Projects";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Companies from "./pages/Companies";
import Points from "./pages/Points";
import React, { useEffect } from "react";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/utils/PrivateRoute";
import Socket from "./redux/services/sockets";
import "./components/projects/projects.css";
import "./components/UI/forms/forms.css";
import Photos from "./pages/Photos";
import { useAppSelector } from "./lib/hooks/redux";
import { selectCurrentUser } from "./redux/reducers/authReducer";

export const socket = new Socket();

const App = () => {
  const user = useAppSelector(selectCurrentUser);
  useEffect(() => {
    if (user) {
      socket.joinRooms(user);
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Companies />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/points" element={<Points />} />
          <Route path="/point-photos" element={<Photos />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
