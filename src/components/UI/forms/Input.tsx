import React, { memo, useState } from "react";

interface IInputProps {
  placeholder: string;
  reactHookFormRegisterRes: {};
  style?: React.CSSProperties;
  type?: string;
  autoFocus?: boolean;
}

const Input: React.FC<IInputProps> = memo(
  ({ placeholder, reactHookFormRegisterRes, autoFocus, style, type = "text" }) => {
    const [clicked, setClicked] = useState<boolean>(false);
    return (
      <div className="form__input__wrapper">
        <input
          autoFocus={autoFocus}
          onClick={() => setClicked(true)}
          type={type}
          style={style}
          className="form__input"
          {...reactHookFormRegisterRes}
          placeholder={!clicked ? placeholder : ""}
        />
        <label className={clicked ? "form__label active" : "form__label"}>{placeholder}</label>
      </div>
    );
  }
);

export default Input;
