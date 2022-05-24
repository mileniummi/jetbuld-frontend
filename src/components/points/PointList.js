import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import PointPreview from "./PointPreview";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoints } from "../../redux/actions/point";
import { ITEM_LIMIT } from "../../redux/constants/app";
import { CircularProgress } from "@material-ui/core";

const PointList = ({ projectId, companyId }) => {
  const user = useSelector((state) => state.users.user);
  const points = useSelector((state) => state.points);
  const isLoading = useSelector((state) => state.app.loading);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPoints(user, page, projectId));
  }, [dispatch, page, projectId, user]);

  const pointPreviews = points.current.map((point) => (
    <PointPreview companyId={companyId} key={nanoid()} point={point} />
  ));

  function handlePageChange(event, value) {
    dispatch(fetchPoints(user, value, projectId));
    setPage(value);
  }

  return (
    <div>
      {points.current.length ? (
        <>
          <Pagination
            className="pagination"
            count={Math.ceil(points.count / ITEM_LIMIT)}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
          {isLoading ? (
            <div className="loader__wrapper">
              <CircularProgress color={"inherit"} />
            </div>
          ) : (
            pointPreviews
          )}
        </>
      ) : (
        <div className="nothing-to-show">
          <h4>You have no points in this project yet...</h4>
        </div>
      )}
    </div>
  );
};

export default PointList;
