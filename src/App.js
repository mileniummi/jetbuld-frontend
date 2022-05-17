import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Projects from "./pages/Projects";
import ProjectInfo from "./components/projects/ProjectInfo";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Companies from "./pages/Companies";
import Points from "./pages/Points";
import PointPhotos from "./components/points/PointPhotos";
import React, { Component } from "react";
import { connect } from "react-redux";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import Socket from "./services/socketsService";

export const socket = new Socket();

class App extends Component {
  componentDidMount() {
    if (this.props.user) {
      socket.joinRooms(this.props.user);
    }
  }

  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Companies />} exact />
            <Route path="/projects" element={<Projects />} exact />
            <Route path="/points" element={<Points />} />
            <Route path="/project-info" element={<ProjectInfo />} />
            <Route path="/point-photos" element={<PointPhotos />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.users.user,
});

export default connect(mapStateToProps, null)(App);
