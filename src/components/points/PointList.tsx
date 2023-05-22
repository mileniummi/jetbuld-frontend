import React, { useState } from "react";
import { Pagination } from "@mui/material";
import { useAppError } from "@/lib/hooks/useAppError";
import { useGetPointsQuery } from "@/redux/services/baseApi";
import { ITEM_LIMIT } from "@/lib/constants";
import NothingToShow from "../utils/nothingToShow";
import Loader from "@/components/UI/loader/Loader";
import PointCard from "@/components/points/pointCard/PointCard";

interface PointListProps {
  projectId: number;
}

const PointList = ({ projectId }: PointListProps) => {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    error
  } = useGetPointsQuery({ projectId: projectId, page: page - 1, size: ITEM_LIMIT });

  useAppError(error);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data?.content?.length ? (
        <div>
          {data?.content.map((point) => (
            <PointCard point={point} key={point?.id} />
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
        <NothingToShow message="You have no points in this project yet..." />
      )}
    </>
  );
};

export default PointList;
