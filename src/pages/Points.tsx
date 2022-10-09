import Header from "../components/headers/Header";
import React, { useEffect, useState } from "react";
import PointList from "../components/points/PointList";
import { useLocation } from "react-router-dom";
import CreatePointForm from "../components/points/CreatePointForm";
import PopupWindow from "../components/utils/popup/PopupWindow";
import { IProject } from "../models/Project";
import { useAppDispatch, useAppSelector } from "../lib/hooks/redux";
import { selectSelectedProject, setSelectedProject } from "../redux/reducers/selectedProjectReducer";
import StateHeader from "@/components/headers/StateHeader";
import { EAppEntities } from "@/models/App";

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
      <StateHeader
        id={project.id}
        entity={EAppEntities.PROJECT}
        name={project.name}
        state={project.stage}
        description={project.description}
      />
      <Header handleCreateClick={handleCreatePointClick} pageLocation={"Point"} buttonText={"Add New Point"} />
      <PointList />
      <PopupWindow transitionInState={createPoint} hideFunction={handleCreatePointClick}>
        <CreatePointForm handleCreateClick={handleCreatePointClick} />
      </PopupWindow>
    </>
  );
}
