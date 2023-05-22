import React, { useEffect, useState } from "react";
import Header from "../components/headers/Header";
import UploadFileDropzoneForm from "../components/photos/UploadFileForm";
import { useLocation, useParams } from "react-router-dom";
import PhotosList from "../components/photos/PhotosList";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedPoint, setSelectedPoint } from "@/redux/reducers/selectedPointReducer";
import { IPoint } from "@/models/Point";
import StateHeader from "@/components/headers/StateHeader";
import { EAppEntities } from "@/models/App";
import PageNotFound from "@/components/PageNotFound";
import { useGetPointQuery, useGetPointsQuery, useGetProjectQuery } from "@/redux/services/baseApi";
import Loader from "@/components/UI/loader/Loader";
import { useAppError } from "@/lib/hooks/useAppError";

export default function Photos() {
  const params = useParams();

  if (!params.id || isNaN(parseInt(params.id))) {
    return <PageNotFound />;
  }

  return <PointAwarePhotos pointId={parseInt(params.id)} />;

};

export interface PointAwarePhotosProps {
  pointId: number;
}

const PointAwarePhotos = ({ pointId }: PointAwarePhotosProps) => {
  const { data: point, isLoading, error } = useGetPointQuery(pointId);
  useAppError(error);
  const [showUploadPhotoForm, setShowUploadPhotoForm] = useState(false);

  const uploadPhoto = () => {
    setShowUploadPhotoForm(true);
  };

  return (isLoading ?
      <Loader /> :
      point ?
        <>
          <Header pageLocation="Photo" handleCreateClick={uploadPhoto} buttonText="Upload New Photo" />
          <StateHeader
            id={point.id}
            entity={EAppEntities.POINT}
            name={point.name}
            // state={point.stage}
            description={point.description}
          />
          <PhotosList pointId={point.id} />
          <UploadFileDropzoneForm
            active={showUploadPhotoForm}
            pointId={point.id}
            hideForm={() => setShowUploadPhotoForm(false)}
          />
        </> : <PageNotFound />
  );
};
