import React from "react";
// @ts-ignore
import styles from "./index.module.css";

interface SettingsInputProps {
  placeholder: string;
  type?: "text" | "tel" | "email";
}

const SettingsInput: React.FC<SettingsInputProps> = ({ placeholder, type = "text" }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{placeholder}</label>
      <input className={styles.input} type={type} />
    </div>
  );
};

export default SettingsInput;
