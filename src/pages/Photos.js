import React, { useEffect, useState } from "react";
import Header from "../components/headers/Header";
import { fetchPhotos } from "../redux/actions/photos";
import UploadFileDropzoneForm from "../components/photos/UploadFileForm";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PhotosList from "../components/photos/PhotosList";

const Photos = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { pointId } = location.state;
  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.users.user);
  const [showUploadPhotoForm, setShowUploadPhotoForm] = useState(false);

  const uploadPhoto = () => {
    setShowUploadPhotoForm(true);
  };

  useEffect(() => {
    dispatch(fetchPhotos(user, page, pointId));
  }, [dispatch, page, pointId, user]);

  function handlePageChange(event, value) {
    dispatch(fetchPhotos(user, value, pointId));
    setPage(value);
  }

  return (
    <>
      <Header pageLocation="Photo" handleCreateClick={uploadPhoto} buttonText="Upload New Photo" />
      <PhotosList page={page} handlePageChange={handlePageChange} />
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

export default Photos;
