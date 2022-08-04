import React from "react";
import "./index.css";

const NothingToShow: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="nothing-to-show__container">
      {message}
      <div className="nothing-to-show__image"> </div>
    </div>
  );
};

export default NothingToShow;
