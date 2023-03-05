import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import StoreIcon from "@mui/icons-material/Store";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { removeUserCredentials, selectCurrentUser } from "@/redux/reducers/authReducer";
import { baseApi } from "@/redux/services/baseApi";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";
import { persistor } from "@/redux/store";
import "./sidebar.css";
import { selectSelectedProject } from "@/redux/reducers/selectedProjectReducer";
import Avatar from "../UI/avatar";

// @ts-ignore
import styles from "./sidebar.module.scss"
import cn from "classnames";

const muiIconProps = { sx: { color: "black" }, className: "nav__item__icon" };

const unAuthorisedLinks = [
  { path: "login", icon: <LoginIcon {...muiIconProps} />, text: "Login" },
  { path: "register", icon: <HowToRegIcon {...muiIconProps} />, text: "Register" },
];

interface ISidebarProps {
  hideSidebar: boolean;
  setHideSidebar: Dispatch<SetStateAction<boolean>>;
}

//TODO:сделать текущую active иконку nav__item белой
const Sidebar: React.FC<ISidebarProps> = memo(({ hideSidebar, setHideSidebar }) => {
  const user = useAppSelector(selectCurrentUser);
  const [showSidebar, setShowSidebar] = useState(!hideSidebar);
  const selectedCompany = useAppSelector(selectSelectedCompany);
  const selectedProject = useAppSelector(selectSelectedProject);
  const dispatch = useAppDispatch();

  const authorisedLinks = [
    { path: "/", icon: <StoreIcon {...muiIconProps} />, text: "Home", condition: true },
    { path: "/projects", icon: <AssignmentIcon {...muiIconProps} />, text: "Projects", condition: selectedCompany },
    { path: "/points", icon: <RadioButtonCheckedIcon {...muiIconProps} />, text: "Points", condition: selectedProject },
    { path: "/users", icon: <PeopleAltIcon {...muiIconProps} />, text: "Users", condition: selectedCompany },
  ];

  function changeSidebarVisibility() {
    setHideSidebar((prevState) => !prevState);
    setShowSidebar((prevState) => !prevState);
  }

  const logout = () => {
    persistor.purge();
    dispatch(removeUserCredentials());
    dispatch(baseApi.util.resetApiState());
  };

  // user authorized nav
  if (user) {
    return (
      <nav className={styles.nav}>
        <div className={hideSidebar ? "nav__arrow opened" : "nav__arrow"} onClick={changeSidebarVisibility}>
          <ArrowDropDownIcon sx={{ height: "30px", width: "30px" }} />
        </div>
        <CSSTransition in={hideSidebar} classNames="slide-left" timeout={600} unmountOnExit>
          <div className="nav__hidden">
            <NavLink className="nav__avatar hidden" to={"/settings"}>
              <Avatar user={user} size={"sm"} />
            </NavLink>
            <div className={styles.item} onClick={logout}>
              <PowerSettingsNewIcon {...muiIconProps} />
            </div>
            <div className="nav__white-line"> </div>
            {authorisedLinks.map(
              (link) =>
                link.condition && (
                  <NavLink key={link.text} className={cn(styles.item, styles.hidden)} to={link.path}>
                    {link.icon}
                  </NavLink>
                )
            )}
          </div>
        </CSSTransition>
        <CSSTransition in={showSidebar} classNames="slide-right" timeout={300} unmountOnExit>
          <div>
            <h2 className={styles.title}>CompanyProject</h2>
            <NavLink className={cn(styles.item, styles.hidden)} to={"/settings"}>
              <Avatar user={user} size={"sm"} />
              {user.firstName} {user.lastName}
            </NavLink>
            <div className={styles.item} onClick={logout}>
              <PowerSettingsNewIcon {...muiIconProps} />
              Logout
            </div>
            <div className="nav__white-line"> </div>
            {authorisedLinks.map(
              (link) =>
                link.condition && (
                  <NavLink key={link.text} className={styles.item} to={link.path}>
                    {link.icon} {link.text}
                  </NavLink>
                )
            )}
          </div>
        </CSSTransition>
      </nav>
    );
  }

  // user unauthorized nav
  return (
    <nav className={styles.nav}>
      <div className={hideSidebar ? "nav__arrow opened" : "nav__arrow"} onClick={changeSidebarVisibility}>
        <ArrowDropDownIcon sx={{ height: "30px", width: "30px" }} />
      </div>
      {!hideSidebar && <h2 className={styles.title}>CompanyProject</h2>}
      <div className="nav__hidden">
        {unAuthorisedLinks.map((link) => (
          <NavLink key={link.text} className={styles.item} to={link.path}>
            {link.icon}
            {!hideSidebar && link.text}
          </NavLink>
        ))}
      </div>
    </nav>
  );
});

export default Sidebar;
