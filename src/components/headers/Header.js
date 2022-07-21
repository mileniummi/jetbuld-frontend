import React from "react";
import "./header.css";
import Ripple from "../UI/ripple-effect/Ripple";
import { TextField } from "@mui/material";

const Header = ({ pageLocation, buttonText, handleCreateClick }) => {
  return (
    <div className="header">
      <h1 className="header__location-name">{pageLocation} feed</h1>
      {/*TODO: filter data by using this input*/}
      {/*<div className="header__input">*/}
      {/*  <TextField label={`Find a ${pageLocation}...`} size={"small"} variant={"outlined"} />*/}
      {/*</div>*/}
      <button className="header__button" onClick={handleCreateClick}>
        {buttonText}
        <Ripple duration={700} />
      </button>
    </div>
  );
};

export default Header;
