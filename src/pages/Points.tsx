import Header from "../components/headers/Header";
import React, { useState } from "react";
import PointList from "../components/points/PointList";
import { useParams } from "react-router-dom";
import CreatePointForm from "../components/points/CreatePointForm";
import PopupWindow from "../components/utils/popup/PopupWindow";
import StateHeader from "@/components/headers/StateHeader";
import { EAppEntities } from "@/models/App";
import PageNotFound from "@/components/PageNotFound";
import { useGetProjectQuery } from "@/redux/services/baseApi";
import { useAppError } from "@/lib/hooks/useAppError";
import Loader from "@/components/UI/loader/Loader";

export default function Points() {
  const params = useParams();

  if (!params.id || isNaN(parseInt(params.id))) {
    return <PageNotFound />;
  }

  return <PointFound id={parseInt(params.id)} />;

}

export interface PointFoundProps {
  id: number;
}

const PointFound = ({ id }: PointFoundProps) => {
  const { data: project, isLoading, error } = useGetProjectQuery(id);
  useAppError(error);
  const [createPoint, setCreatePoint] = useState(false);
  const handleCreatePointClick = () => {
    setCreatePoint((prevState) => !prevState);
  };

  return isLoading ?
    <Loader /> :
    project ? (<><StateHeader
        id={project.id}
        entity={EAppEntities.PROJECT}
        name={project.name}
        description={project.description}
      />
        <Header
          handleCreateClick={handleCreatePointClick}
          pageLocation={"Point"}
          buttonText={"Add New Point"}
        />
        <PointList projectId={id} />
        <PopupWindow transitionInState={createPoint} hideFunction={handleCreatePointClick}>
          <CreatePointForm projectId={id.toString()} handleCreateClick={handleCreatePointClick} />
        </PopupWindow> </>
    ) : <PageNotFound />;
};

