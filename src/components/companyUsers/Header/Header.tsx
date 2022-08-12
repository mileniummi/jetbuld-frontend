import React from "react";
// @ts-ignore
import styles from "./index.module.css";
import Button from "@/components/UI/forms/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users</h2>
      <Button size="sm" variant={"green"}>
        <PersonAddIcon fontSize="small" /> Invite user
      </Button>
    </div>
  );
};

export default Header;
