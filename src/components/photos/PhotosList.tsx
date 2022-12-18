import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import { useDeletePhotoMutation, useGetPhotosQuery } from "@/redux/services/baseApi";
import getOffset from "../../lib/helpers/getOffset";
import "./photos.css";
import { DATE_FORMAT } from "@/models/App";
import { IPhoto } from "@/models/Photo";
import { useAppError } from "@/lib/hooks/useAppError";
import { PHOTO_LIMIT } from "@/lib/constants";
import NothingToShow from "../utils/nothingToShow";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

// @ts-ignore
import styles from "./Photos.module.scss";
import PopupWindow from "@/components/utils/popup/PopupWindow";
import DeleteElementConfirmation from "@/components/DeleteElementConfirmation/DeleteElementConfirmation";

const PhotosList: React.FC<{ pointId: number }> = ({ pointId }) => {
  const [page, setPage] = useState(1);
  const [photosSortedByDay, setPhotosSortedByDay] = useState<{ [key: string]: IPhoto[] }>({});

  const { data, error, isLoading } = useGetPhotosQuery({
    offset: getOffset(page),
    limit: PHOTO_LIMIT,
    pointId,
  });

  useAppError(error);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePhoto, { error: PhotoError, isLoading: photoIsDeleting, isSuccess }] = useDeletePhotoMutation();
  const [deletingPhotoId, setDeletingPhotoId] = useState<null | number>(null);

  const deletePointAction = async () => {
    if (!isSuccess && deletingPhotoId) {
      await deletePhoto(deletingPhotoId);
      toast.success(`Point photo deleted!`);
      setIsDeleteModalOpen(false);
    }
  };

  useAppError(PhotoError);

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
                  <Grid sx={{ minWidth: "250px" }} key={nanoid()} xs={4} item>
                    <Card>
                      <CardMedia component="img" image={photo.s3Url} alt="point" />
                      <CardContent sx={{ overflow: "auto" }}>
                        <Typography variant="h6">{photo.name}</Typography>
                        <Typography variant="body2">{photo.description}</Typography>
                      </CardContent>
                      <div
                        className={styles.deleteIcon}
                        onClick={(e) => {
                          e.preventDefault();
                          setDeletingPhotoId(photo.id);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <PopupWindow
                hideFunction={() => {
                  setDeletingPhotoId(null);
                  setIsDeleteModalOpen((v) => !v);
                }}
                transitionInState={isDeleteModalOpen}
              >
                <DeleteElementConfirmation
                  isLoading={photoIsDeleting}
                  deleteAction={deletePointAction}
                  entity="photo"
                />
              </PopupWindow>
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
