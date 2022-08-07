import React from "react";
// @ts-ignore
import styles from "./index.module.css";

interface SettingsInputProps {
  placeholder: string;
  type?: "text" | "tel" | "email";
  register?: {};
}

const SettingsInput: React.FC<SettingsInputProps> = ({ placeholder, type = "text", register }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{placeholder}</label>
      <input {...register} className={styles.input} type={type} />
    </div>
  );
};

export default SettingsInput;
