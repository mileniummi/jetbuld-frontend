import React from "react";
import "./header.css";
import Ripple from "../utils/ripple-effect/Ripple";

const Header = ({ pageLocation, handleCreateClick }) => {
  return (
    <div className="header">
      <h1 className="header__location-name">{pageLocation} feed</h1>
      <input className="header__input" type="text" placeholder={`Find a ${pageLocation}...`} />
      <button className="header__button" onClick={handleCreateClick}>
        {`Create New ${pageLocation}`}
        <Ripple duration={700} />
      </button>
    </div>
  );
};

export default Header;
