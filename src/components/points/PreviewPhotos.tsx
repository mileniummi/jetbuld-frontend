import React, { memo } from "react";
import { IPoint } from "../../types/Point";
import { useGetPhotosQuery } from "../../redux/services/baseApi";
import { nanoid } from "nanoid";
import AppError from "../errors/AppError";
import { useAppError } from "../../lib/hooks/useAppError";
import { PHOTO_LIMIT } from "../../lib/constants";

const PreviewPhotos: React.FC<{ point: IPoint }> = memo(({ point }) => {
  const { data: [count, current] = [], error } = useGetPhotosQuery({
    offset: 1,
    limit: PHOTO_LIMIT,
    pointId: point.id,
  });

  const appError = useAppError(error);
  return (
    <div className="preview__photos">
      {count && current ? (
        current
          .slice(0, 6)
          .map((photo) => <img key={nanoid()} className="preview__photo" src={photo.s3Url} alt="point" />)
      ) : (
        <></>
      )}
      {appError && <AppError {...appError} />}
    </div>
  );
});

export default PreviewPhotos;
