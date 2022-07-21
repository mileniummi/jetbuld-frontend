import Header from "../components/headers/Header";
import React, { useEffect, useState } from "react";
import InfoHeader from "../components/headers/InfoHeader";
import { useLocation } from "react-router-dom";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import { useDispatch, useSelector } from "react-redux";
import PopupWindow from "../components/utils/popup/PopupWindow";
import { setCurrentCompany } from "../redux/actions/app";
import ProjectList from "../components/projects/ProjectList";
import { fetchProjects } from "../redux/actions/project";

export default function Projects() {
  const location = useLocation();
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
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
      <Header handleCreateClick={handleCreateProjectClick} pageLocation={"Project"} buttonText={"Add New Project"} />
      <ProjectList company={company} page={page} setPage={setPage} />
      <PopupWindow transitionInState={createProject} hideFunction={handleCreateProjectClick}>
        <CreateProjectForm
          handleCreateClick={handleCreateProjectClick}
          companyId={company.id}
          companyName={company.name}
          reload={() => {
            dispatch(fetchProjects(company.id, user, page));
          }}
        />
      </PopupWindow>
    </>
  );
}
