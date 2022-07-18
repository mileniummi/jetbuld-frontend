import React from "react";
import "./header.css";
import Ripple from "../UI/ripple-effect/Ripple";
import { useForm } from "react-hook-form";
import { Input, TextField } from "@mui/material";

const Header = ({ pageLocation, handleCreateClick }) => {
  const { register, watch, handleSubmit } = useForm();

  return (
    <div className="header">
      <h1 className="header__location-name">{pageLocation} feed</h1>
      <TextField label={`Find a ${pageLocation}...`} sx={{ margin: "0 auto 0 10px" }} variant={"filled"} />
      <button className="header__button" onClick={handleCreateClick}>
        {`Create New ${pageLocation}`}
        <Ripple duration={700} />
      </button>
    </div>
  );
};

export default Header;
