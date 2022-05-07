import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../context";
import { nanoid } from "nanoid";
import PointPreview from "./PointPreview";
import { Pagination } from "@material-ui/lab";

const PointList = ({ projectId }) => {
  const { user } = useContext(userContext);
  const [points, setPoints] = useState({ count: 0, arr: [] });
  const [page, setPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    const offset = page === 1 ? 0 : page * limit - limit;
    axios
      .get(`https://jetbuild-app.herokuapp.com/project/${projectId}/points?page=${offset}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setPoints({ count: res.data[0], arr: res.data[1] });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page, projectId, user.token]);

  const pointPreviews = points.arr.map((point) => <PointPreview key={nanoid()} point={point} />);

  function handlePageChange(event, value) {
    setPage(value);
  }

  return (
    <div>
      {points.arr.length ? (
        <>
          <Pagination
            className="pagination"
            count={Math.ceil(points.count / limit)}
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
          {pointPreviews}
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
