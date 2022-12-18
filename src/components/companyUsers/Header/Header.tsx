import React, { useState } from "react";
// @ts-ignore
import styles from "./index.module.css";
import Button from "@/components/UI/forms/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PopupWindow from "@/components/utils/popup/PopupWindow";
import AddUserPopup from "@/components/companyUsers/AddUserPopup";

const Header: React.FC = () => {
  const [inviteUserModalOpened, setInviteUserModalOpened] = useState(false);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Users</h2>
      <Button onClick={() => setInviteUserModalOpened(true)} size="sm" variant={"green"}>
        <PersonAddIcon fontSize="small" /> Invite user
      </Button>
      <PopupWindow hideFunction={() => setInviteUserModalOpened((v) => !v)} transitionInState={inviteUserModalOpened}>
        <AddUserPopup closeModal={() => setInviteUserModalOpened(false)} />
      </PopupWindow>
    </div>
  );
};

export default Header;
