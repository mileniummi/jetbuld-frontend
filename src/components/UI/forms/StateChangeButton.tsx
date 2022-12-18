import React from "react";
import Ripple from "../ripple-effect/Ripple";
import { CircularProgress } from "@mui/material";
import cn from "classnames";
// @ts-ignore
import styles from "./form.module.scss";
import { EPointState } from "@/models/Point";

interface IStateChangeButtonProps {
  onClick?: () => void;
  showLoader?: boolean;
  size?: "sm" | "md" | "lg";
  nextState: EPointState;
  disabled?: boolean;
}

const StateChangeButton: React.FC<IStateChangeButtonProps> = ({
  children,
  onClick,
  showLoader,
  size,
  nextState,
  disabled,
}) => {
  return (
    <button
      disabled={showLoader || disabled}
      title={disabled ? "Not enough privileges to change status" : ""}
      onClick={onClick}
      className={cn(size && styles[size], styles.btn, styles[nextState.toLowerCase()], disabled && styles.disabled)}
    >
      <div className={styles.content}>
        <div className={cn(styles.children, showLoader && styles.loading)}>{children}</div>
        {showLoader && <CircularProgress className={styles.loader} size={20} />}
      </div>
      <Ripple color="#222222" duration={700} />
    </button>
  );
};

export default StateChangeButton;
