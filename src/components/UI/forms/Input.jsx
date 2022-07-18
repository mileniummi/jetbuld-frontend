import React from "react";

const Input = ({ placeholder, dataStorage, reactHookFormRegisterRes, style, type = "text" }) => {
  return (
    <div className="form__input__wrapper">
      <input
        type={type}
        style={style}
        className="form__input"
        {...reactHookFormRegisterRes}
        placeholder={placeholder}
      />
      <label className={dataStorage === "" ? "form__label" : "form__label active"}>{placeholder}</label>
    </div>
  );
};

export default Input;
