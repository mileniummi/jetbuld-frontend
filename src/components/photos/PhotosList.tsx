import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import NothingToShow from "../utils/nothingToShow";
import { useGetPointPhotosQuery } from "@/redux/services/baseApi";
import { DATE_FORMAT } from "@/models/App";
import { IPhoto } from "@/models/Photo";
import { useAppError } from "@/lib/hooks/useAppError";
import "./photos.css";
import PopupWindow from "@/components/utils/popup/PopupWindow";

// @ts-ignore
import styles from "./Photos.module.scss";

const PHOTOS_PER_PAGE = 20;


const PhotosList: React.FC<{ pointId: number }> = ({ pointId }) => {
  const [photosSortedByDay, setPhotosSortedByDay] = useState<{ [key: string]: IPhoto[] }>({});
  const [page, setPage] = useState(1);


  const { data, error, isLoading } = useGetPointPhotosQuery({
    pointId,
    page: page - 1,
    size: PHOTOS_PER_PAGE
  }, { pollingInterval: 3000 });

  useAppError(error);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingPhotoId, setDeletingPhotoId] = useState<null | number>(null);

  // const deletePointAction = async () => {
  //   if (!isSuccess && deletingPhotoId) {
  //     await deletePhoto(deletingPhotoId);
  //     toast.success(`Point photo deleted!`);
  //     setIsDeleteModalOpen(false);
  //   }
  // };

  // useAppError(PhotoError);

  useEffect(() => {
    if (data?.content) {
      const newData: { [key: string]: IPhoto[] } = {};
      const sortedData = Array.from(data?.content)?.sort((a, b) => a.id - b.id);
      sortedData.forEach((photo) => {
        const day = new Date(photo.created);
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

  return (
    <div>
      {isLoading ? (
        <div className="loader__wrapper">
          <CircularProgress color={"inherit"} />
        </div>
      ) : data && data.content && photosSortedByDay ? (
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
                      {/*<div*/}
                      {/*  className={styles.deleteIcon}*/}
                      {/*  onClick={(e) => {*/}
                      {/*    e.preventDefault();*/}
                      {/*    setDeletingPhotoId(photo.id);*/}
                      {/*    setIsDeleteModalOpen(true);*/}
                      {/*  }}*/}
                      {/*>*/}
                      {/*  <DeleteIcon />*/}
                      {/*</div>*/}
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
                {/*<DeleteElementConfirmation*/}
                {/*  isLoading={photoIsDeleting}*/}
                {/*  deleteAction={deletePointAction}*/}
                {/*  entity="photo"*/}
                {/*/>*/}
              </PopupWindow>
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
          ))}
        </div>
      ) : (
        <NothingToShow message="You have no photos in this point yet.." />
      )}
    </div>
  );
};

export default PhotosList;
