import React from "react";
import { IDeleteElementConfirmationProps } from "@/components/deleteElementConfirmation/DeleteElementConfirmation.types";
import Button from "@/components/UI/forms/Button";
// @ts-ignore
import styles from "./DeleteElementConfirmation.module.scss";

const DeleteElementConfirmation = ({
  entity,
  isLoading,
  deleteAction,
}: IDeleteElementConfirmationProps): JSX.Element => {
  return (
    <div className={styles.content}>
      <p>Are u sure you want to delete {entity}?</p>
      <Button onClick={deleteAction} showLoader={isLoading} variant="red">
        Yes, delete
      </Button>
    </div>
  );
};

export default DeleteElementConfirmation;
