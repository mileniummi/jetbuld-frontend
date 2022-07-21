import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { PHOTO_LIMIT } from "../../redux/constants/photos";
import { useSelector } from "react-redux";
import "./photos.css";
import { DATE_FORMAT } from "../../redux/constants/app";

const PhotosList = ({ page, handlePageChange }) => {
  const photos = useSelector((state) => state.photos);
  const isLoading = useSelector((state) => state.app.loading);
  const [photosSortedByDay, setPhotosSortedByDay] = useState({});

  useEffect(() => {
    const newData = {};
    photos.current.forEach((photo) => {
      const day = new Date(photo.timeCreated);
      const dayOfUploading = new Intl.DateTimeFormat("en-US", DATE_FORMAT).format(day);
      if (Object.keys(newData).includes(dayOfUploading)) {
        newData[dayOfUploading].push(photo);
      } else {
        newData[dayOfUploading] = new Array(photo);
      }
    });
    setPhotosSortedByDay(newData);
  }, [photos]);

  const state = useSelector((state) => state);
  console.log(state);

  return (
    <div>
      {photos.current.length ? (
        <>
          {isLoading ? (
            <div className="loader__wrapper">
              <CircularProgress color={"inherit"} />
            </div>
          ) : (
            <div className="photos__wrapper">
              {Object.keys(photosSortedByDay).map((day) => (
                <div key={nanoid()}>
                  <h3 className="photo__day-of-uploading">{day}</h3>
                  <Grid
                    key={nanoid()}
                    container
                    spacing={2}
                    sx={{ paddingRight: "10px", m: "10px", width: "calc(100% - 16px)" }}
                  >
                    {photosSortedByDay[day].map((photo) => (
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
                </div>
              ))}
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
            </div>
          )}
        </>
      ) : (
        <div className="nothing-to-show">
          <h4>You have no photos in this point yet...</h4>
        </div>
      )}
    </div>
  );
};

export default PhotosList;
