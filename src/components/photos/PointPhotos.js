import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../headers/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../../redux/actions/photos";
import { PHOTO_LIMIT } from "../../redux/constants/photos";
import { nanoid } from "nanoid";
import { Card, CardContent, CardMedia, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import UploadFileDropzoneForm from "./UploadFileForm";

const PointPhotos = () => {
  const location = useLocation();
  const { pointId } = location.state;
  const photos = useSelector((state) => state.photos);
  const user = useSelector((state) => state.users.user);
  const isLoading = useSelector((state) => state.app.loading);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [showUploadPhotoForm, setShowUploadPhotoForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPhotos(user, page, pointId));
  }, [dispatch, page, pointId, user]);

  function handlePageChange(event, value) {
    dispatch(fetchPhotos(user, value, pointId));
    setPage(value);
  }

  return (
    <>
      <Header
        pageLocation="Photo"
        handleCreateClick={() => {
          setShowUploadPhotoForm(true);
        }}
      />
      <div>
        {photos.current.length ? (
          <>
            {isLoading ? (
              <div className="loader__wrapper">
                <CircularProgress color={"inherit"} />
              </div>
            ) : (
              <>
                <Grid container spacing={2} sx={{ m: "10px" }}>
                  {photos.current.map((photo) => (
                    <Grid key={nanoid()} item>
                      <Card sx={{}}>
                        <CardMedia component="img" height="194" image={photo.s3Url} alt="point" />
                        <CardContent>
                          <Typography variant="h6" componennt="div">
                            {photo.name}
                          </Typography>
                          <Typography variant="body2" componennt="div">
                            {photo.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                {photos.count > PHOTO_LIMIT && (
                  <Pagination
                    className="pagination"
                    count={Math.ceil(photos.count / PHOTO_LIMIT)}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <div className="nothing-to-show">
            <h4>You have no photos in this point yet...</h4>
          </div>
        )}
      </div>
      <UploadFileDropzoneForm
        active={showUploadPhotoForm}
        pointId={pointId}
        hideForm={() => setShowUploadPhotoForm(false)}
        reload={() => {
          dispatch(fetchPhotos(user, page, pointId));
        }}
      />
    </>
  );
};

export default PointPhotos;
