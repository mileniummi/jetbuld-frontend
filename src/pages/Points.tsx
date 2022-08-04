import Header from "../components/headers/Header";
import { useEffect, useState } from "react";
import PointList from "../components/points/PointList";
import { useLocation } from "react-router-dom";
import CreatePointForm from "../components/points/CreatePointForm";
import React from "react";
import PopupWindow from "../components/utils/popup/PopupWindow";
import { IProject } from "../types/Project";
import { useAppDispatch, useAppSelector } from "../lib/hooks/redux";
import { selectSelectedProject, setSelectedProject } from "../redux/reducers/selectedProjectReducer";

interface LocationState {
  from: { pathname: string };
  project: IProject;
}

export default function Points() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [createPoint, setCreatePoint] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { project } = location.state as LocationState;
      dispatch(setSelectedProject({ project }));
    }
  }, [dispatch, location.state]);

  const handleCreatePointClick = () => {
    setCreatePoint((prevState) => !prevState);
  };

  const project = useAppSelector(selectSelectedProject);

  if (project === null) {
    return <></>;
  }

  return (
    <>
      <Header handleCreateClick={handleCreatePointClick} pageLocation={"Point"} buttonText={"Add New Point"} />
      <PointList />
      <PopupWindow transitionInState={createPoint} hideFunction={handleCreatePointClick}>
        <CreatePointForm handleCreateClick={handleCreatePointClick} />
      </PopupWindow>
    </>
  );
}
