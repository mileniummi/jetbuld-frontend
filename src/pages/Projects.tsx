import Header from "../components/headers/Header";
import React, { useEffect, useState } from "react";
import InfoHeader from "../components/headers/InfoHeader";
import { useLocation } from "react-router-dom";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import PopupWindow from "../components/utils/popup/PopupWindow";
import ProjectList from "../components/projects/ProjectList";
import { ICompany } from "../types/Company";
import { selectSelectedCompany, setSelectedCompany } from "../redux/reducers/selectedCompanyReducer";
import { useAppDispatch, useAppSelector } from "../lib/hooks/redux";

interface LocationState {
  from: { pathname: string };
  company: ICompany;
}

const Projects: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [createProject, setCreateProject] = useState(false);

  useEffect(() => {
    if (location.state) {
      const { company } = location.state as LocationState;
      dispatch(setSelectedCompany({ company }));
    }
  }, [dispatch, location.state]);

  function handleCreateProjectClick() {
    setCreateProject((prevState) => !prevState);
  }
  const selectedCompany = useAppSelector(selectSelectedCompany);

  if (selectedCompany === null) {
    return <></>;
  }

  return (
    <>
      <InfoHeader />
      <Header handleCreateClick={handleCreateProjectClick} pageLocation={"Project"} buttonText={"Add New Project"} />
      <ProjectList />
      <PopupWindow transitionInState={createProject} hideFunction={handleCreateProjectClick}>
        <CreateProjectForm handleCreateClick={handleCreateProjectClick} />
      </PopupWindow>
    </>
  );
};

export default Projects;
