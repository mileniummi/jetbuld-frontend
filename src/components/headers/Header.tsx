import React, { memo } from "react";
import "./header.css";
import Ripple from "../UI/ripple-effect/Ripple";

interface IHeaderProps {
  pageLocation: string;
  buttonText: string;
  handleCreateClick: () => void;
  createEntityDisabled?: boolean;
}

const Header: React.FC<IHeaderProps> = memo(({ pageLocation, buttonText, handleCreateClick, createEntityDisabled }) => {
  return (
    <div className="header">
      <h1 className="header__location-name">{pageLocation} feed</h1>
      {/*TODO: filter data by using this settingsUI*/}
      {/*<div className="header__input">*/}
      {/*  <TextField label={`Find a ${pageLocation}...`} size={"small"} variant={"outlined"} />*/}
      {/*</div>*/}
      <button
        title={createEntityDisabled ? "not enough rights to create entity" : ""}
        disabled={createEntityDisabled}
        className="header__button"
        onClick={handleCreateClick}
      >
        {buttonText}
        <Ripple duration={700} />
      </button>
    </div>
  );
});

export default Header;
