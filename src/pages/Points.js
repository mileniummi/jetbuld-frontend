import Header from "../components/headers/Header";
import { useState } from "react";
import PointList from "../components/points/PointList";
import { useLocation } from "react-router-dom";
import CreatePointForm from "../components/points/CreatePointForm";
import React from "react";
import { CSSTransition } from "react-transition-group";
import PopupWindow from "../components/popup/PopupWindow";

export default function Points() {
  const [createPoint, setCreatePoint] = useState(false);
  const location = useLocation();
  const { id } = location.state.project;
  const { companyId, companyName } = location.state;

  const handleCreatePointClick = (e) => {
    setCreatePoint((prevState) => !prevState);
  };

  return (
    <main>
      <Header handleCreateClick={handleCreatePointClick} pageLocation={"Point"} />
      <PointList companyId={companyId} projectId={id} />
      <CSSTransition in={createPoint} classNames="fade" timeout={300} unmountOnExit>
        <PopupWindow hideFunction={handleCreatePointClick}>
          <CreatePointForm
            companyName={companyName}
            companyId={companyId}
            projectId={id}
            handleCreateClick={handleCreatePointClick}
          />
        </PopupWindow>
      </CSSTransition>
    </main>
  );
}
