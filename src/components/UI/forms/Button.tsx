import React from "react";
import Ripple from "../ripple-effect/Ripple";
import { CircularProgress } from "@mui/material";
import classNames from "classnames";
// @ts-ignore
import styles from "./form.module.scss";

interface IButtonProps {
  onClick?: () => void;
  showLoader?: boolean;
  variant?: "green" | "red";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<IButtonProps> = ({ children, onClick, showLoader, variant, size }) => {
  return (
    <button
      disabled={showLoader}
      onClick={onClick}
      className={classNames(styles.button, variant === "green" && styles.green, variant === "red" && styles.red, size)}
    >
      <div className="form__button__content">{showLoader ? <CircularProgress size={20} /> : children}</div>
      <Ripple color="#222222" duration={700} />
    </button>
  );
};

export default Button;
