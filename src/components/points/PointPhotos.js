import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { userContext } from "../../context";
import Header from "../Header";
import { Pagination } from "@material-ui/lab";

const PointPhotos = () => {
  const location = useLocation();
  const { pointId } = location.state;
  const [photos, setPhotos] = useState({ count: 0, arr: [] });
  const { user } = useContext(userContext);
  const [page, setPage] = useState(1);
  const limit = 3;

  useEffect(() => {
    const offset = page === 1 ? 0 : page * limit - limit;
    const url = `https://jetbuild-app.herokuapp.com/point/${pointId}/photos?page=${offset}&limit=${limit}`;
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setPhotos({ count: res.data[0], arr: res.data[1] });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page, pointId, user.token]);

  const photoViews = photos.arr.map((photo) => <img className="point-image" src={photo.s3Url} alt="point-photo" />);

  function handlePageChange(event, value) {
    setPage(value);
  }

  return (
    <>
      <main>
        <Header pageLocation="Photos" />
        <div>
          {photos.arr.length ? (
            <>
              <Pagination
                className="pagination"
                count={Math.ceil(photos.count / limit)}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
              {photoViews}
            </>
          ) : (
            <div className="nothing-to-show">
              <h4>You have no photos in this point yet...</h4>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default PointPhotos;
