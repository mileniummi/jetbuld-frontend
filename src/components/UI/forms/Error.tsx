import React from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Error: React.FC<{ text: any }> = ({ text }) => {
  if (text === undefined) {
    text = "Unexpected Error";
  }
  return (
    <div className="form__error">
      <ErrorOutlineIcon color="error" />
      <span className="form-error-message">{text}</span>
    </div>
  );
};

export default Error;
