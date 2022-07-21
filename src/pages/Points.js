import Header from "../components/headers/Header";
import { useEffect, useState } from "react";
import PointList from "../components/points/PointList";
import { useLocation } from "react-router-dom";
import CreatePointForm from "../components/points/CreatePointForm";
import React from "react";
import PopupWindow from "../components/utils/popup/PopupWindow";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "../redux/actions/app";
import { fetchPoints } from "../redux/actions/point";

//TODO: пофисить баг что при изменении pointa пустому поинту присваивается содержимое другого
export default function Points() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const [createPoint, setCreatePoint] = useState(false);
  const user = useSelector((state) => state.users.user);
  let project = useSelector((state) => state.app.currentProject);
  if (!project) {
    project = location.state.project;
  }
  useEffect(() => {
    if (location.state) {
      dispatch(setCurrentProject(location.state.project));
    }
  }, [dispatch, location.state]);

  const handleCreatePointClick = () => {
    setCreatePoint((prevState) => !prevState);
  };
  console.log(project);

  return (
    <>
      <Header handleCreateClick={handleCreatePointClick} pageLocation={"Point"} buttonText={"Add New Point"} />
      <PointList parentProject={location.state && location.state.project} page={page} setPage={setPage} />
      <PopupWindow transitionInState={createPoint} hideFunction={handleCreatePointClick}>
        <CreatePointForm
          reload={() => {
            dispatch(fetchPoints(user, page, project.id));
          }}
          handleCreateClick={handleCreatePointClick}
        />
      </PopupWindow>
    </>
  );
}
