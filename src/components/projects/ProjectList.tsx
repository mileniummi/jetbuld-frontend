import React, { useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import ProjectPreview from "./ProjectPreview";
import { nanoid } from "nanoid";
import { useGetProjectsQuery } from "../../redux/services/baseApi";
import getOffset from "../../lib/helpers/getOffset";
import AppError from "../errors/AppError";
import { useAppError } from "../../lib/hooks/useAppError";
import { useAppSelector } from "../../lib/hooks/redux";
import { selectSelectedCompany } from "../../redux/reducers/selectedCompanyReducer";
import { ITEM_LIMIT } from "../../lib/constants";

const ProjectList = () => {
  const [page, setPage] = useState(1);
  const company = useAppSelector(selectSelectedCompany);
  const {
    data: [count, current] = [],
    isLoading,
    error,
  } = useGetProjectsQuery({ offset: getOffset(page), limit: ITEM_LIMIT, companyId: company?.id });

  const appError = useAppError(error);

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  return (
    <>
      {count && current ? (
        <>
          {isLoading ? (
            <div className="loader__wrapper">
              <CircularProgress color={"inherit"} />
            </div>
          ) : (
            <div>
              {current.map((project) => (
                <ProjectPreview key={nanoid()} project={project} />
              ))}
              {count > ITEM_LIMIT && (
                <Pagination
                  className="pagination"
                  count={Math.ceil(count / ITEM_LIMIT)}
                  page={page}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <div className="nothing-to-show">
          <h4>You have no projects in this company yet...</h4>
        </div>
      )}
      x{appError && <AppError {...appError} />}
    </>
  );
};

export default ProjectList;
