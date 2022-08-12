import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface IRadioOptions {
  active: boolean;
  setActive: (value: boolean) => void;
}

const Radio: React.FC<IRadioOptions> = ({ active, setActive }) => {
  return active ? (
    <CheckBoxIcon onClick={() => setActive(false)} color="primary" />
  ) : (
    <CheckBoxOutlineBlankIcon onClick={() => setActive(true)} color="primary" />
  );
};

export default Radio;
