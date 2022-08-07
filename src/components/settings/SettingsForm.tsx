import React from "react";
// @ts-ignore
import styles from "./index.module.css";
import Input from "./settingsUI/Input";
import SettingsPhoto from "./settingsUI/Photo";
import SettingsTextarea from "./settingsUI/Textarea";
import { useAppSelector } from "../../lib/hooks/redux";
import { selectCurrentUser } from "../../redux/reducers/authReducer";
import { LONG_DATE_FORMAT } from "../../types/App";
import Button from "./settingsUI/Button";

const SettingsForm = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.title}>Account</h1>
        <h4 className={styles.subtitle}>Profile</h4>
        <div className={styles.text}>This information will be displayed publicly so be careful what you share.</div>
        <div className={styles.togetherWrapper}>
          <Input placeholder={"First name"} />
          <Input placeholder={"Last name"} />
        </div>
        <Input placeholder={"Username"} />
        <SettingsPhoto />
        <SettingsTextarea placeholder={"About"} />
        <div className={styles.separator}> </div>
        <h4 className={styles.subtitle}>Personal Information</h4>
        <div className={styles.text}>This information will be displayed publicly so be careful what you share.</div>
        <div className={styles.togetherWrapper}>
          <Input placeholder={"Email address"} />
          <Input placeholder={"Phone number"} />
        </div>
        <div className={styles.togetherWrapper}>
          <Input placeholder={"Country"} />
          <Input placeholder={"Language"} />
        </div>
        <div className={styles.createdOn}>
          This account was created on{" "}
          {new Intl.DateTimeFormat("en-GB", LONG_DATE_FORMAT).format(new Date(user.timeCreated))}
        </div>
        <div className={styles.separator}></div>
        <div className={styles.submitButtons}>
          <Button>Cancel</Button>
          <Button variant="green">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
