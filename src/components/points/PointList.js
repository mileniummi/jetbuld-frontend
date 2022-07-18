import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import PointPreview from "./PointPreview";
import { useDispatch, useSelector } from "react-redux";
import { fetchPoints } from "../../redux/actions/point";
import { ITEM_LIMIT } from "../../redux/constants/app";
import { CircularProgress, Pagination } from "@mui/material";

const PointList = () => {
  const user = useSelector((state) => state.users.user);
  const points = useSelector((state) => state.points);
  const isLoading = useSelector((state) => state.app.loading);
  const [page, setPage] = useState(1);
  const company = useSelector((state) => state.app.currentCompany);
  const project = useSelector((state) => state.app.currentProject);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPoints(user, page, project.id));
  }, [dispatch, page, project.id, user]);

  const pointPreviews = points.current.map((point) => (
    <PointPreview companyId={company.id} key={nanoid()} point={point} />
  ));

  function handlePageChange(event, value) {
    dispatch(fetchPoints(user, value, project.id));
    setPage(value);
  }

  return (
    <div>
      {points.current.length ? (
        <>
          {isLoading ? (
            <div className="loader__wrapper">
              <CircularProgress color={"inherit"} />
            </div>
          ) : (
            pointPreviews
          )}
          <Pagination
            className="pagination"
            count={Math.ceil(points.count / ITEM_LIMIT)}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
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
