import React from "react";
import Ripple from "../../UI/ripple-effect/Ripple";
// @ts-ignore
import styles from "./index.module.css";
import classNames from "classnames";

interface SettingsButtonProps {
  onClick?: () => void;
  variant?: "green";
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ children, variant, onClick }) => {
  return (
    <button onClick={onClick} type="button" className={classNames(styles.button, variant === "green" && styles.green)}>
      {children}
      <Ripple duration={700} />
    </button>
  );
};

export default SettingsButton;
