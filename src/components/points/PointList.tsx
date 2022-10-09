import React, { useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import { useAppError } from "@/lib/hooks/useAppError";
import { useGetPointsQuery } from "@/redux/services/baseApi";
import getOffset from "../../lib/helpers/getOffset";
import PointPreview from "./PointPreview";
import { nanoid } from "nanoid";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedProject } from "@/redux/reducers/selectedProjectReducer";
import { ITEM_LIMIT } from "@/lib/constants";
import NothingToShow from "../utils/nothingToShow";

const PointList = () => {
  const [page, setPage] = useState(1);
  const project = useAppSelector(selectSelectedProject);
  const {
    data: [count, current] = [],
    isLoading,
    error,
  } = useGetPointsQuery({ offset: getOffset(page), limit: ITEM_LIMIT, projectId: project?.id });
  useAppError(error);

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  return (
    <>
      {isLoading ? (
        <div className="loader__wrapper">
          <CircularProgress color={"inherit"} />
        </div>
      ) : count && current ? (
        <>
          {current.map((point) => (
            <PointPreview key={nanoid()} point={point} />
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
        <NothingToShow message="You have no points in this project yet.." />
      )}
    </>
  );
};

export default PointList;
