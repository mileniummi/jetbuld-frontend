import ProjectPreview from "../components/projects/ProjectPreview";
import Header from "../components/headers/Header";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import InfoHeader from "../components/headers/InfoHeader";
import { useLocation } from "react-router-dom";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/actions/project";
import { ITEM_LIMIT } from "../redux/constants/app";
import { CircularProgress } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import PopupWindow from "../components/popup/PopupWindow";

export default function Projects() {
  const projects = useSelector((state) => state.projects);
  const isLoading = useSelector((state) => state.app.loading);
  const user = useSelector((state) => {
    return state.users.user;
  });
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [createProject, setCreateProject] = useState(false);
  const location = useLocation();
  const { id, name, address, description } = location.state.company;

  function handleCreateProjectClick() {
    setCreateProject((prevState) => !prevState);
  }

  function handlePageChange(event, page) {
    dispatch(fetchProjects(id, user, page));
    setPage(page);
  }

  useEffect(() => {
    dispatch(fetchProjects(id, user, page));
  }, [dispatch, id, page, user]);

  return (
    <main>
      <InfoHeader name={name} address={address} description={description} />
      <Header handleCreateClick={handleCreateProjectClick} pageLocation={"Project"} />
      {projects.current.length ? (
        <>
          {isLoading ? (
            <div className="loader__wrapper">
              <CircularProgress color={"inherit"} />
            </div>
          ) : (
            projects.current.map((project) => (
              <ProjectPreview companyId={id} companyName={name} key={nanoid()} project={project} />
            ))
          )}
          <Pagination
            className="pagination"
            count={Math.ceil(projects.count / ITEM_LIMIT)}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </>
      ) : (
        <div className="nothing-to-show">
          <h4>You have no projects in this company yet...</h4>
        </div>
      )}
      <CSSTransition in={createProject} classNames="fade" timeout={300} unmountOnExit>
        <PopupWindow hideFunction={handleCreateProjectClick}>
          <CreateProjectForm handleCreateClick={handleCreateProjectClick} companyId={id} companyName={name} />
        </PopupWindow>
      </CSSTransition>
    </main>
  );
}
