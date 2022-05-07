import ProjectPreview from "../components/projects/ProjectPreview";
import Header from "../components/Header";
import React, { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import InfoHeader from "../components/InfoHeader";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { userContext } from "../context";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import { Pagination } from "@material-ui/lab";

export default function Projects() {
  const [projects, setProjects] = useState({ count: 0, arr: [] });
  const [page, setPage] = useState(1);
  const [createProject, setCreateProject] = useState(false);
  const { user } = useContext(userContext);
  const location = useLocation();
  const { id, name, address } = location.state.company;
  const limit = 3;

  function handleCreateProjectClick() {
    setCreateProject((prevState) => !prevState);
  }

  useEffect(
    function () {
      const offset = page === 1 ? 0 : page * limit - limit;
      const url = `https://jetbuild-app.herokuapp.com/companies/${id}/projects?page=${offset}&limit=${limit}`;
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setProjects({ count: res.data[0], arr: res.data[1] });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [id, page, user.token]
  );

  function handlePageChange(event, value) {
    setPage(value);
  }

  const projectPreviews = projects.arr.map((project) => <ProjectPreview key={nanoid()} project={project} />);

  return (
    <main>
      <InfoHeader name={name} address={address} />
      <Header handleCreateClick={handleCreateProjectClick} pageLocation={"Project"} />
      {createProject ? (
        <CreateProjectForm companyId={id} />
      ) : projects.arr.length ? (
        <>
          <Pagination
            className="pagination"
            count={Math.ceil(projects.count / limit)}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
          {projectPreviews}
        </>
      ) : (
        <div className="nothing-to-show">
          <h4>You have no projects in this company yet...</h4>
        </div>
      )}
      }
    </main>
  );
}
