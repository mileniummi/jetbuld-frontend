import React from "react";
import { IUser } from "@/models/User";
import Avatar from "@/components/UI/avatar";
import { Popover } from "@mui/material";

// @ts-ignore
import { ReactComponent as LogoutIcon } from "../../../assets/common/logout.svg";
// @ts-ignore
import { ReactComponent as SettingsIcon } from "../../../assets/common/settings.svg";
// @ts-ignore
import styles from "./index.module.scss";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "@/components/sidebar/utils/app-routes";
import cn from "classnames";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

export interface UserSettingsProps {
  user: IUser;
  avatarSize: "sm" | "md" | "lg";
  logout: () => void;
}

export const UserSettings = ({ user, avatarSize, logout }: UserSettingsProps) => {
  const [userSettingsOpen, setUserSettingsOpen] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Avatar style={{ cursor: "pointer" }} onClick={() => setUserSettingsOpen(true)} size={avatarSize} user={user}>
        <Popover
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          sx={{ borderRadius: "30px" }}
          anchorEl={ref.current}
          open={userSettingsOpen}
          onClose={() => setUserSettingsOpen(false)}
          classes={{ paper: styles.popup }}
        >
          <div className={styles.popup}>
            <div className={styles.popupLink}>
              <SettingsIcon />
              <NavLink to={AppRoutes.USER_SETTINGS}>My settings</NavLink>
            </div>
            <div className={styles.delimiter}></div>
            <div className={styles.popupLink}>
              <SettingsIcon />
              <NavLink to={AppRoutes.COMPANY_SETTINGS}>Company settings</NavLink>
            </div>
            <div className={styles.delimiter}></div>
            <button className={ cn(styles.popupLink, styles.popupLinkLogout)}>
              <PowerSettingsNewIcon />
              <div className={styles.item} onClick={logout}>Logout</div>
            </button>
          </div>
        </Popover>
      </Avatar>
      <div className={styles.popupRef} ref={ref}></div>
    </>
  );
};