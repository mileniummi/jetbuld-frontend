import React, { useState } from "react";
import Header from "../components/headers/Header";
import UploadFileDropzoneForm from "../components/photos/UploadFileForm";
import { useLocation } from "react-router-dom";
import PhotosList from "../components/photos/PhotosList";
import { useAppDispatch, useAppSelector } from "../lib/hooks/redux";
import { selectSelectedPoint, setSelectedPoint } from "../redux/reducers/selectedPointReducer";
import { IPoint } from "../types/Point";

interface LocationState {
  from: { pathname: string };
  point: IPoint;
}

const Photos = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [showUploadPhotoForm, setShowUploadPhotoForm] = useState(false);

  const uploadPhoto = () => {
    setShowUploadPhotoForm(true);
  };

  if (location.state) {
    const { point } = location.state as LocationState;
    dispatch(setSelectedPoint({ point }));
  }
  const point = useAppSelector(selectSelectedPoint);

  if (point === null) {
    return <></>;
  }
  return (
    <>
      <Header pageLocation="Photo" handleCreateClick={uploadPhoto} buttonText="Upload New Photo" />
      <PhotosList pointId={point.id} />
      <UploadFileDropzoneForm
        active={showUploadPhotoForm}
        pointId={point.id}
        hideForm={() => setShowUploadPhotoForm(false)}
      />
    </>
  );
};

export default Photos;
