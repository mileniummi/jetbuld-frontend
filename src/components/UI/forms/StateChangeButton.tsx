import React from "react";
import Ripple from "../ripple-effect/Ripple";
import { CircularProgress } from "@mui/material";
import cn from "classnames";
import { EProjectStage } from "@/models/Project";
// @ts-ignore
import styles from "./form.module.scss";

interface IStateChangeButtonProps {
  onClick?: () => void;
  showLoader?: boolean;
  size?: "sm" | "md" | "lg";
  nextState: EProjectStage;
}

const StateChangeButton: React.FC<IStateChangeButtonProps> = ({ children, onClick, showLoader, size, nextState }) => {
  return (
    <button
      disabled={showLoader}
      onClick={onClick}
      className={cn(size && styles[size], styles.btn, styles[nextState.toLowerCase()])}
    >
      <div className={styles.content}> {showLoader ? <CircularProgress size={20} /> : children}</div>
      <Ripple color="#222222" duration={700} />
    </button>
  );
};

export default StateChangeButton;
