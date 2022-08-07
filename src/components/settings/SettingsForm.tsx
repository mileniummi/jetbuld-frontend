import React from "react";
// @ts-ignore
import styles from "./index.module.css";
import Input from "./settingsUI/Input";
import SettingsPhoto from "./settingsUI/Photo";
import SettingsTextarea from "./settingsUI/Textarea";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectCurrentUser } from "@/redux/reducers/authReducer";
import { LONG_DATE_FORMAT } from "@/types/App";
import Button from "./settingsUI/Button";
import { useForm } from "react-hook-form";

const SettingsForm = () => {
  const user = useAppSelector(selectCurrentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...user,
      about: "",
      country: "Russia",
      language: "russian",
      phone: "+232",
    },
    mode: "onBlur",
  });

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={styles.container} onSubmit={handleSubmit(handleFormSubmit)}>
      <form className={styles.form}>
        <h1 className={styles.title}>Account</h1>
        <h4 className={styles.subtitle}>Profile</h4>
        <div className={styles.text}>This information will be displayed publicly so be careful what you share.</div>
        <div className={styles.togetherWrapper}>
          <Input register={register("firstName")} placeholder={"First name"} />
          <Input register={register("lastName")} placeholder={"Last name"} />
        </div>
        <Input register={register("login")} placeholder={"Username"} />
        <SettingsPhoto />
        <SettingsTextarea register={register("about")} placeholder={"About"} />
        <div className={styles.separator}> </div>
        <h4 className={styles.subtitle}>Personal Information</h4>
        <div className={styles.text}>This information will be displayed publicly so be careful what you share.</div>
        <div className={styles.togetherWrapper}>
          <Input register={register("email")} placeholder={"Email address"} />
          <Input type="tel" register={register("phone")} placeholder={"Phone number"} />
        </div>
        <div className={styles.togetherWrapper}>
          <Input register={register("country")} placeholder={"Country"} />
          <Input register={register("language")} placeholder={"Language"} />
        </div>
        <div className={styles.createdOn}>
          This account was created on{" "}
          {new Intl.DateTimeFormat("en-GB", LONG_DATE_FORMAT).format(new Date(user.timeCreated))}
        </div>
        <div className={styles.separator}></div>
        <div className={styles.submitButtons}>
          <Button>Cancel</Button>
          <Button type="submit" variant="green">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
