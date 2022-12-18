import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./point.css";
import { IPoint, PrivilegeUtils } from "@/models/Point";
import { LONG_DATE_FORMAT } from "@/models/App";
import PreviewPhotos from "./PreviewPhotos";
import { useDeletePointMutation } from "@/redux/services/baseApi";
import { toast } from "react-toastify";
import { useAppError } from "@/lib/hooks/useAppError";
import PopupWindow from "@/components/utils/popup/PopupWindow";
import DeleteElementConfirmation from "@/components/DeleteElementConfirmation/DeleteElementConfirmation";
// @ts-ignore
import styles from "./Points.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import cn from "classnames";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectCurrentUserRole } from "@/redux/reducers/authReducer";

const PointPreview: React.FC<{ point: IPoint }> = ({ point }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePoint, { error, isLoading, isSuccess }] = useDeletePointMutation();

  const deletePointAction = async () => {
    if (!isSuccess) {
      await deletePoint(point.id);
      toast.success(`Point ${point.name} deleted!`);
      setIsDeleteModalOpen(false);
    }
  };

  useAppError(error);
  const role = useAppSelector(selectCurrentUserRole);

  return (
    <div className="preview">
      <Link style={{ width: "100%" }} to="/photos" state={{ from: "Point Preview", point }}>
        <div className="preview__description__container">
          <div>
            <h3 className="preview__name">{point.name}</h3>
            <h4 className="preview__location">{point.description} </h4>
            <p className="preview__last-update-time">
              {new Intl.DateTimeFormat("en-GB", LONG_DATE_FORMAT).format(new Date(point.timeCreated))}
            </p>
          </div>
          <div className="preview__photos">
            <PreviewPhotos point={point} />
          </div>
          <div className={styles.utils}>
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
            <div className={cn(styles.state, styles[point.stage.toLowerCase()])}>{point.stage}</div>
          </div>
        </div>
      </Link>
      <PopupWindow hideFunction={() => setIsDeleteModalOpen((v) => !v)} transitionInState={isDeleteModalOpen}>
        <DeleteElementConfirmation isLoading={isLoading} deleteAction={deletePointAction} entity="point" />
      </PopupWindow>
    </div>
  );
};

export default PointPreview;
