import React, { useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import { useGetProjectsQuery } from "@/redux/services/baseApi";
import { useAppError } from "@/lib/hooks/useAppError";
import { useAppSelector } from "@/lib/hooks/redux";
import { ITEM_LIMIT } from "@/lib/constants";
import NothingToShow from "../utils/nothingToShow";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";
import ProjectCard from "@/components/projects/projetCard/ProjectCard";

const ProjectList = () => {
  const [page, setPage] = useState(1);
  const company = useAppSelector(selectSelectedCompany);
  const {
    data,
    isLoading,
    error
  } = useGetProjectsQuery({ companyId: company?.id, page: page  - 1, size: ITEM_LIMIT });

  useAppError(error);

  return (
    <>
      {isLoading ? (
        <div className="loader__wrapper">
          <CircularProgress color={"inherit"} />
        </div>
      ) : data?.content?.length ? (
        <div>
          {data?.content.map((project) => (
            <ProjectCard key={project?.id} project={project} />
          ))}
          {data?.totalPages > 1 && (
            <Pagination
              className="pagination"
              count={data?.totalPages}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={(_, value) => setPage(value)}
            />
          )}
        </div>
      ) : (
        <NothingToShow message="You have no projects in this company yet..." />
      )}
    </>
  );
};

export default ProjectList;
