import React from "react";
import { IError } from "@/models/Error";
import "./errors.css";

const AppError: React.FC<IError> = ({ data }) => {
  return (
    <div className="error__wrapper">
      <h1 className="error__code">{data.statusCode}</h1>
      <h2 className="error__message">{data.message}</h2>
    </div>
  );
};

export default AppError;
