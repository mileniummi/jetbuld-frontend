import React from "react";
import Ripple from "../ripple-effect/Ripple";

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="form__button">
      {children} <Ripple duration={700} />
    </button>
  );
};

export default Button;
