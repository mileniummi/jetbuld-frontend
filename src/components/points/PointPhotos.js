import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../../redux/actions/photos";
import { PHOTO_LIMIT } from "../../redux/constants/photos";
import { CircularProgress } from "@material-ui/core";
import { nanoid } from "nanoid";

const PointPhotos = () => {
  const location = useLocation();
  const { pointId } = location.state;
  const photos = useSelector((state) => state.photos);
  const user = useSelector((state) => state.users.user);
  const isLoading = useSelector((state) => state.app.loading);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPhotos(user, page, pointId));
  }, [dispatch, page, pointId, user]);

  const photoViews = photos.current.map((photo) => (
    <img className="point-image" key={nanoid()} src={photo.s3Url} alt="point-photo" />
  ));

  function handlePageChange(event, value) {
    dispatch(fetchPhotos(user, value, pointId));
    setPage(value);
  }

  console.log(photos.count);

  return (
    <>
      <main>
        <Header pageLocation="Photos" />
        <div>
          {photos.current.length ? (
            <>
              <Pagination
                className="pagination"
                count={Math.ceil(photos.count / PHOTO_LIMIT)}
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
                photoViews
              )}
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
