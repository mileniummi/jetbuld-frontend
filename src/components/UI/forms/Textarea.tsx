import React, { useState } from "react";

interface ITextareaProps {
  placeholder: string;
  reactHookFormRegisterRes: {};
  style?: React.CSSProperties;
}

const Textarea: React.FC<ITextareaProps> = ({ placeholder, reactHookFormRegisterRes, style }) => {
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <div className="form__input__wrapper">
      <textarea
        onClick={() => setClicked(true)}
        style={style}
        className="form__textarea"
        {...reactHookFormRegisterRes}
        placeholder={!clicked ? placeholder : ""}
      />
      <label className={clicked ? "form__label active" : "form__label"}>{placeholder}</label>
    </div>
  );
};

export default Textarea;
