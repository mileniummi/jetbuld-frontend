import React, { useEffect, useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import ProjectPreview from "./ProjectPreview";
import { nanoid } from "nanoid";
import { ITEM_LIMIT } from "../../redux/constants/app";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../redux/actions/project";

const ProjectList = ({ company }) => {
  const user = useSelector((state) => {
    return state.users.user;
  });
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const projects = useSelector((state) => state.projects);
  const isLoading = useSelector((state) => state.app.loading);

  function handlePageChange(event, page) {
    dispatch(fetchProjects(company.id, user, page));
    setPage(page);
  }

  useEffect(() => {
    dispatch(fetchProjects(company.id, user, page));
  }, [dispatch, company.id, page, user]);

  return (
    <>
      {projects.current.length ? (
        <>
          {isLoading ? (
            <div className="loader__wrapper">
              <CircularProgress color={"inherit"} />
            </div>
          ) : (
            projects.current.map((project) => (
              <ProjectPreview companyId={company.id} companyName={company.name} key={nanoid()} project={project} />
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
    </>
  );
};

export default ProjectList;
