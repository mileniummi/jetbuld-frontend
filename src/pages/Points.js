import Header from "../components/Header";
import { useState } from "react";
import PointList from "../components/points/PointList";
import { useLocation } from "react-router-dom";
import CreatePointForm from "../components/points/CreatePointForm";
import React from "react"

export default function Points() {
  const [createPoint, setCreatePoint] = useState(false);
  const location = useLocation();
  const { id, name, address } = location.state.project;

  const handleCreatePointClick = (e) => {
    setCreatePoint((prevState) => !prevState);
  };

  return (
    <main>
      <Header
        handleCreateClick={handleCreatePointClick}
        pageLocation={"Point"}
      />
      {createPoint ? (
        <CreatePointForm
          projectId={id}
          handleCreateCompanyClick={handleCreatePointClick}
        />
      ) : (
        <PointList projectId={id} />
      )}
    </main>
  );
}
