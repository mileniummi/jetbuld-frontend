import React, { useEffect, useState } from "react";
import Header from "../components/headers/Header";
import UploadFileDropzoneForm from "../components/photos/UploadFileForm";
import { useLocation } from "react-router-dom";
import PhotosList from "../components/photos/PhotosList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedPoint, setSelectedPoint } from "@/redux/reducers/selectedPointReducer";
import { IPoint } from "@/models/Point";
import StateHeader from "@/components/headers/StateHeader";
import { EAppEntities } from "@/models/App";

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
  useEffect(() => {
    if (location.state) {
      const { point } = location.state as LocationState;
      dispatch(setSelectedPoint({ point }));
    }
  }, [dispatch, location.state]);

  const point = useAppSelector(selectSelectedPoint);

  if (point === null) {
    return <></>;
  }
  return (
    <>
      <Header pageLocation="Photo" handleCreateClick={uploadPhoto} buttonText="Upload New Photo" />
      <StateHeader
        id={point.id}
        entity={EAppEntities.POINT}
        name={point.name}
        state={point.stage}
        description={point.description}
      />
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
