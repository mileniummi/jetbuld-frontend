import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useGetPhotosQuery } from "../../redux/services/baseApi";
import getOffset from "../../lib/helpers/getOffset";
import "./photos.css";
import { DATE_FORMAT } from "../../types/App";
import { IPhoto } from "../../types/Photo";
import { useAppError } from "../../lib/hooks/useAppError";
import { PHOTO_LIMIT } from "../../lib/constants";
import NothingToShow from "../utils/nothingToShow";

const PhotosList: React.FC<{ pointId: number }> = ({ pointId }) => {
  const [page, setPage] = useState(1);
  const [photosSortedByDay, setPhotosSortedByDay] = useState<{ [key: string]: IPhoto[] }>({});

  const { data, error, isLoading } = useGetPhotosQuery({
    offset: getOffset(page),
    limit: PHOTO_LIMIT,
    pointId,
  });

  useAppError(error);

  useEffect(() => {
    if (data) {
      const [_, current = []] = data;
      const newData: { [key: string]: IPhoto[] } = {};
      current.forEach((photo) => {
        const day = new Date(photo.timeCreated);
        const dayOfUploading = new Intl.DateTimeFormat("en-US", DATE_FORMAT).format(day);
        if (Object.keys(newData).includes(dayOfUploading)) {
          newData[dayOfUploading].push(photo);
        } else {
          newData[dayOfUploading] = new Array(photo);
        }
      });
      setPhotosSortedByDay(newData);
    }
  }, [data]);

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  return (
    <div>
      {isLoading ? (
        <div className="loader__wrapper">
          <CircularProgress color={"inherit"} />
        </div>
      ) : data && data[0] && photosSortedByDay ? (
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
                  <Grid sx={{ minWidth: "300px" }} key={nanoid()} xs={4} item>
                    <Card>
                      <CardMedia component="img" image={photo.s3Url} alt="point" />
                      <CardContent sx={{ overflow: "auto" }}>
                        <Typography variant="h6">{photo.name}</Typography>
                        <Typography variant="body2">{photo.description}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
          {data[0] > PHOTO_LIMIT && (
            <Pagination
              className="pagination"
              count={Math.ceil(data[0] / PHOTO_LIMIT)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          )}
        </div>
      ) : (
        <NothingToShow message="You have no photos in this point yet.." />
      )}
    </div>
  );
};

export default PhotosList;