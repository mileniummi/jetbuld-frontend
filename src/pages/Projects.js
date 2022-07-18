import Header from "../components/headers/Header";
import React, { useEffect, useState } from "react";
import InfoHeader from "../components/headers/InfoHeader";
import { useLocation } from "react-router-dom";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import { useDispatch, useSelector } from "react-redux";
import PopupWindow from "../components/utils/popup/PopupWindow";
import { setCurrentCompany } from "../redux/actions/app";
import ProjectList from "../components/projects/ProjectList";

export default function Projects() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [createProject, setCreateProject] = useState(false);
  let company = useSelector((state) => state.app.currentCompany);
  if (location.state) {
    company = location.state.company;
  }

  function handleCreateProjectClick() {
    setCreateProject((prevState) => !prevState);
  }

  useEffect(() => {
    if (location.state) {
      dispatch(setCurrentCompany(location.state.company));
    }
  }, [dispatch, location.state]);

  return (
    <>
      <InfoHeader name={company.name} address={company.address} description={company.description} />
      <Header handleCreateClick={handleCreateProjectClick} pageLocation={"Project"} />
      <ProjectList company={company} />
      <PopupWindow transitionInState={createProject} hideFunction={handleCreateProjectClick}>
        <CreateProjectForm
          handleCreateClick={handleCreateProjectClick}
          companyId={company.id}
          companyName={company.name}
        />
      </PopupWindow>
    </>
  );
}
