import React, { memo, useState } from "react";
import { nanoid } from "nanoid";
import { CircularProgress, Pagination } from "@mui/material";
import { useGetCompaniesQuery } from "../../redux/services/baseApi";
import CompanyPreview from "./CompanyPreview";
import { useAppError } from "../../lib/hooks/useAppError";
import AppError from "../errors/AppError";
import getOffset from "../../lib/helpers/getOffset";
import { ITEM_LIMIT } from "../../lib/constants";

const CompaniesList = memo(() => {
  const [page, setPage] = useState(1);
  const {
    data: [count, current] = [],
    isLoading,
    error,
  } = useGetCompaniesQuery({
    offset: getOffset(page),
    limit: ITEM_LIMIT,
  });
  const appError = useAppError(error);

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  return (
    <div>
      {isLoading ? (
        <div className="loader__wrapper">
          <CircularProgress color={"inherit"} />
        </div>
      ) : count && current ? (
        <>
          {current.map((company) => (
            <CompanyPreview key={nanoid()} company={company} />
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
        </>
      ) : (
        <div className="nothing-to-show">
          <h4>You have no companies created yet... Add a new one by clicking on Add New Company button.</h4>
        </div>
      )}
      {appError && <AppError {...appError} />}
    </div>
  );
});

export default CompaniesList;
