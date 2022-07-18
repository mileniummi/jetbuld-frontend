import React from "react";

const Textarea = ({ placeholder, dataStorage, reactHookFormRegisterRes, style }) => {
  return (
    <div className="form__input__wrapper">
      <textarea style={style} className="form__textarea" {...reactHookFormRegisterRes} placeholder={placeholder} />
      <label className={dataStorage === "" ? "form__label" : "form__label active"}>{placeholder}</label>
    </div>
  );
};

export default Textarea;
