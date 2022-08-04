import React from "react";
import Ripple from "../ripple-effect/Ripple";
import { CircularProgress } from "@mui/material";
interface IButtonProps {
  onClick?: () => {};
  showLoader?: boolean;
}

const Button: React.FC<IButtonProps> = ({ children, onClick, showLoader }) => {
  console.log(showLoader);
  return (
    <button disabled={showLoader} onClick={onClick} className="form__button">
      {showLoader ? <CircularProgress color={"white"} size={20} /> : children}
      <Ripple duration={700} />
    </button>
  );
};

export default Button;
