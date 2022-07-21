import Header from "../components/headers/Header";
import { useEffect, useState } from "react";
import PointList from "../components/points/PointList";
import { useLocation } from "react-router-dom";
import CreatePointForm from "../components/points/CreatePointForm";
import React from "react";
import PopupWindow from "../components/utils/popup/PopupWindow";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "../redux/actions/app";

export default function Points() {
  const [createPoint, setCreatePoint] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state) {
      dispatch(setCurrentProject(location.state.project));
    }
  }, [dispatch, location.state]);

  const handleCreatePointClick = () => {
    setCreatePoint((prevState) => !prevState);
  };

  return (
    <>
      <Header handleCreateClick={handleCreatePointClick} pageLocation={"Point"} buttonText={"Add New Point"} />
      <PointList parentProject={location.state && location.state.project} />
      <PopupWindow transitionInState={createPoint} hideFunction={handleCreatePointClick}>
        <CreatePointForm handleCreateClick={handleCreatePointClick} />
      </PopupWindow>
    </>
  );
}
