import React from "react";
import "./popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const PopupWindow = ({ children, hideFunction }) => {
  return (
    <div className="popup-wrapper">
      <div className="popup">
        {children}
        <div className="popup-info">
          <FontAwesomeIcon onClick={hideFunction} icon={faXmark} color="#555555" className="popup-close" />
        </div>
      </div>
    </div>
  );
};

export default PopupWindow;
