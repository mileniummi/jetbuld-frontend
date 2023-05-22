import React, { memo } from "react";
import { IPoint } from "../../models/Point";
import { useGetPhotosQuery } from "../../redux/services/baseApi";
import { nanoid } from "nanoid";
import AppError from "../errors/AppError";
import { useAppError } from "../../lib/hooks/useAppError";
import { PHOTO_LIMIT } from "../../lib/constants";
import { IPhoto } from "@/models/Photo";

export interface PreviewPhotosProps {
  photos: IPhoto[];
}

const PreviewPhotos = memo(({ photos }: PreviewPhotosProps) => {
  return (
    <div className="preview__photos">
      {photos?.length ? photos.slice(0, 6)
          .map((photo) => <img key={nanoid()} className="preview__photo" src={photo.s3Url} alt="point" />)
        : <></>}
    </div>
  );
});

export default PreviewPhotos;
