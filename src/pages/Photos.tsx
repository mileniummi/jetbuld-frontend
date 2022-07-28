import React, { useEffect, useState } from "react";
import Header from "../components/headers/Header";
import UploadFileDropzoneForm from "../components/photos/UploadFileForm";
import { useLocation } from "react-router-dom";
import PhotosList from "../components/photos/PhotosList";

interface LocationState {
  from: { pathname: string };
  pointId: number;
}

const Photos = () => {
  const location = useLocation();
  const [showUploadPhotoForm, setShowUploadPhotoForm] = useState(false);

  const uploadPhoto = () => {
    setShowUploadPhotoForm(true);
  };

  if (location.state) {
    const { pointId } = location.state as LocationState;

    return (
      <>
        <Header pageLocation="Photo" handleCreateClick={uploadPhoto} buttonText="Upload New Photo" />
        <PhotosList pointId={pointId} />
        <UploadFileDropzoneForm
          active={showUploadPhotoForm}
          pointId={pointId}
          hideForm={() => setShowUploadPhotoForm(false)}
        />
      </>
    );
  } else {
    return <></>;
  }
};

export default Photos;
