import React, { useState } from "react";
// @ts-ignore
import styles from "./index.module.css";
import Button from "@/components/UI/forms/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PopupWindow from "@/components/utils/popup/PopupWindow";
import AddUserPopup from "@/components/companyUsers/AddCompanyUser/AddUserPopup";

const Header: React.FC = () => {
  const [inviteUserModalOpened, setInviteUserModalOpened] = useState(false);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Team members</h2>
      <Button onClick={() => setInviteUserModalOpened(true)} size="sm">
        <PersonAddIcon fontSize="small" /> Add member
      </Button>
      <PopupWindow hideFunction={() => setInviteUserModalOpened((v) => !v)} transitionInState={inviteUserModalOpened}>
        <AddUserPopup closeModal={() => setInviteUserModalOpened(false)} />
      </PopupWindow>
    </div>
  );
};

export default Header;
