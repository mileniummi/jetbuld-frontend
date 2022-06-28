import { useLocation } from "react-router-dom";
import InfoHeader from "../headers/InfoHeader";
import React from "react";

export default function ProjectInfo() {
  const location = useLocation();
  const { name, address, description } = location.state.company;
  console.log(description);
  return (
    <main>
      <div className="project-info">
        <InfoHeader name={name} address={address} description={description} />
        <div className="project-info-places">
          <h3 className="project-info-places__title">Places(2)</h3>
          <div className="project-info-places__item shadow_wrapper">text</div>
          <div className="project-info-places__item shadow_wrapper">text</div>
        </div>
      </div>
    </main>
  );
}
