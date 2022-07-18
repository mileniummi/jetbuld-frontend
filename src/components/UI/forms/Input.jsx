import React from "react";

const Input = ({ placeholder, dataStorage, reactHookFormRegisterRes, style }) => {
  console.log(dataStorage);
  return (
    <div className="form__input__wrapper">
      <input style={style} className="form__input" {...reactHookFormRegisterRes} placeholder={placeholder} />
      <label className={dataStorage === "" ? "form__label" : "form__label active"}>{placeholder}</label>
    </div>
  );
};

export default Input;
