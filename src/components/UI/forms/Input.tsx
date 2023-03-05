import React, { memo, useState } from "react";

// @ts-ignore
import styles from "./form.module.scss";
import cn from "classnames";

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
      <div className={styles.wrapper}>
        <input
          autoFocus={autoFocus}
          onClick={() => setClicked(true)}
          type={type}
          style={style}
          className={styles.input}
          {...reactHookFormRegisterRes}
          placeholder={!clicked ? placeholder : ""}
        />
        <label className={cn(styles.label, clicked && styles.active)}>{placeholder}</label>
      </div>
    );
  }
);

export default Input;
