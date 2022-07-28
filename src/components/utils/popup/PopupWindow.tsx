import React from "react";
import "./popup.css";
import CloseIcon from "@mui/icons-material/Close";
import { CSSTransition } from "react-transition-group";

interface IPopupWindowProps {
  hideFunction: () => void;
  transitionInState: boolean;
}

const PopupWindow: React.FC<IPopupWindowProps> = ({ children, hideFunction, transitionInState }) => {
  return (
    <CSSTransition in={transitionInState} classNames="fade" timeout={300} unmountOnExit>
      <div className="popup-wrapper">
        <div className="popup">
          {children}
          <div className="popup-info">
            <CloseIcon className="popup-close" sx={{ color: "#555555", w: 30, h: 30 }} onClick={hideFunction} />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PopupWindow;
