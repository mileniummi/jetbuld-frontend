import React from "react";
// @ts-ignore
import styles from "./index.module.css";

interface SettingsTextareaProps {
  placeholder: string;
  register?: {};
}

const SettingsTextarea: React.FC<SettingsTextareaProps> = ({ placeholder, register }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{placeholder}</label>
      <textarea {...register} className={styles.textarea} />
    </div>
  );
};

export default SettingsTextarea;
