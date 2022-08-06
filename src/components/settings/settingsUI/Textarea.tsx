import React from "react";
// @ts-ignore
import styles from "./index.module.css";

interface SettingsTextareaProps {
  placeholder: string;
}

const SettingsTextarea: React.FC<SettingsTextareaProps> = ({ placeholder }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{placeholder}</label>
      <textarea className={styles.textarea} />
    </div>
  );
};

export default SettingsTextarea;
