import { Link } from "react-router-dom";
import React, { useState } from "react";
import { LONG_DATE_FORMAT } from "@/models/App";
import { IProject } from "@/models/Project";
// @ts-ignore
import styles from "./projects.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import PopupWindow from "@/components/utils/popup/PopupWindow";
import DeleteElementConfirmation from "@/components/deleteElementConfirmation/DeleteElementConfirmation";
import { useDeleteProjectMutation } from "@/redux/services/baseApi";
import { useAppError } from "@/lib/hooks/useAppError";
import { toast } from "react-toastify";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectCurrentUserRole } from "@/redux/reducers/authReducer";
import { PrivilegeUtils } from "@/models/Point";

interface IProjectPreviewProps {
  project: IProject;
}

const ProjectPreview: React.FC<IProjectPreviewProps> = ({ project }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProject, { error, isLoading, isSuccess }] = useDeleteProjectMutation();

  const deleteProjectAction = async () => {
    if (!isSuccess) {
      await deleteProject(project.id);
      toast.success(`Project ${project.name} deleted!`);
      setIsDeleteModalOpen(false);
    }
  };

  useAppError(error);

  const role = useAppSelector(selectCurrentUserRole);

  return (
    <>
      <Link to="/points" state={{ from: "ProjectPreview", project }}>
        <div className="preview">
          <div className="preview__description">
            <h3 className="preview__name">{project.name}</h3>
            <h4 className="preview__location">{project.description} </h4>
            <p className="preview__last-update-time">
              {new Intl.DateTimeFormat("en-GB", LONG_DATE_FORMAT).format(new Date(project.timeCreated))}
            </p>
          </div>
          {PrivilegeUtils.checkCanModifyEntities(role) && (
            <div
              className={styles.deleteIcon}
              onClick={(e) => {
                e.preventDefault();
                setIsDeleteModalOpen(true);
              }}
            >
              <DeleteIcon />
            </div>
          )}
        </div>
      </Link>
      <PopupWindow hideFunction={() => setIsDeleteModalOpen((v) => !v)} transitionInState={isDeleteModalOpen}>
        <DeleteElementConfirmation isLoading={isLoading} deleteAction={deleteProjectAction} entity="project" />
      </PopupWindow>
    </>
  );
};

export default ProjectPreview;
