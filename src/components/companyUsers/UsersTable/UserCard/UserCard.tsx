import React, { useState } from "react";
import { IUser, UserRoleNameMap } from "@/models/User";
import classNames from "classnames";
import Avatar from "@/components/UI/avatar";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

// @ts-ignore
import styles from "../users-table.module.scss";

const UserCard: React.FC<{ user: IUser, rowIndex: number }> = ({ user, rowIndex }) => {

  return (
    <div className={styles.container}>
      <div className={styles.rowIndex}>{rowIndex}.</div>
      <div className={classNames(styles.row)}>
        <div className={styles.rowItem}>
          <Avatar user={user} size={"md"} />
        </div>
        <div className={styles.rowItem}>
          {UserRoleNameMap[user.role]}
        </div>
        <div className={styles.rowItem}>
          <AlternateEmailIcon />
          {user.email}
        </div>
      </div>
    </div>
  );
};

export default UserCard;