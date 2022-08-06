import React from "react";
import Ripple from "../../UI/ripple-effect/Ripple";
// @ts-ignore
import styles from "./index.module.css";
import classNames from "classnames";

const SettingsButton: React.FC<{ variant?: "green" }> = ({ children, variant }) => {
  return (
    <button className={classNames(styles.button, variant === "green" && styles.green)}>
      {children}
      <Ripple duration={700} />
    </button>
  );
};

export default SettingsButton;
