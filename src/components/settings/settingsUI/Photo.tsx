import React from "react";
// @ts-ignore
import styles from "./index.module.css";
import Avatar from "../../UI/avatar";
import Button from "./Button";

const SettingsPhoto = () => {
  return (
    <div>
      <div className={styles.label}>Photo</div>
      <div className={styles.photoContainer}>
        <Avatar size={"sm"} />
        <Button>Change</Button>
        <Button>Remove</Button>
      </div>
    </div>
  );
};

export default SettingsPhoto;
