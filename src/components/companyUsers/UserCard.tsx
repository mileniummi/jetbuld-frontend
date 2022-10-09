import React, { useState } from "react";
import { IUser } from "@/models/User";
// @ts-ignore
import styles from "./index.module.css";
import Avatar from "@/components/UI/avatar";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import classNames from "classnames";
import Radio from "@/components/UI/radio";

const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className={classNames(styles.row, selected && styles.selected)}>
      <div className={styles.rowItem}>
        <Radio active={selected} setActive={(data) => setSelected(data)} />
        <div className={styles.rowItem}>
          <Avatar user={user} size={"md"} />
          {user.firstName} {user.lastName}
          <div className={styles.rowItem}>
            <AlternateEmailIcon />
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
