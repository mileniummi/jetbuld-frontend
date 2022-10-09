import React from "react";
import Ripple from "../ripple-effect/Ripple";
import { CircularProgress } from "@mui/material";
import classNames from "classnames";

interface IButtonProps {
  onClick?: () => void;
  showLoader?: boolean;
  variant?: "green";
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<IButtonProps> = ({ children, onClick, showLoader, variant, size }) => {
  return (
    <button
      disabled={showLoader}
      onClick={onClick}
      className={classNames("form__button", variant === "green" && "green", size)}
    >
      <div className="form__button__content">{showLoader ? <CircularProgress size={20} /> : children}</div>
      <Ripple color="#222222" duration={700} />
    </button>
  );
};

export default Button;
