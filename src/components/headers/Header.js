import React from "react";
import "./header.css";
import Ripple from "../UI/ripple-effect/Ripple";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";

const Header = ({ pageLocation, handleCreateClick }) => {
  const { register, watch, handleSubmit } = useForm();

  return (
    <div className="header">
      <h1 className="header__location-name">{pageLocation} feed</h1>
      <div className="header__input">
        <TextField label={`Find a ${pageLocation}...`} size={"small"} variant={"outlined"} />
      </div>
      <button className="header__button" onClick={handleCreateClick}>
        {`Create New ${pageLocation}`}
        <Ripple duration={700} />
      </button>
    </div>
  );
};

export default Header;
