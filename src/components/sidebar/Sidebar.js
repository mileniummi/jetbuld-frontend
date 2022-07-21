import React, { useState } from "react";
import companyIcon from "../../images/icons/apple-whole-solid.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/user";
import { CSSTransition } from "react-transition-group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { showSidebar as showSidebarAction } from "../../redux/actions/app";
import { hideSidebar as hideSidebarAction } from "../../redux/actions/app";
import "./sidebar.css";

const muiIconProps = { color: "black", className: "nav__item__icon" };

const unAuthorisedLinks = [
  { path: "login", icon: <LoginIcon {...muiIconProps} />, text: "Login" },
  { path: "register", icon: <HowToRegIcon {...muiIconProps} />, text: "Register" },
];

export default function Sidebar() {
  const user = useSelector((state) => state.users.user);
  const [showSidebar, setShowSidebar] = useState(false);
  const { hideSidebar, currentCompany, currentProject } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const authorisedLinks = [
    {
      path: "/",
      icon: <img className="nav__item__icon" src={companyIcon} alt="project-icon" />,
      text: "Companies",
      condition: true,
    },
    { path: "/projects", icon: <AssignmentIcon {...muiIconProps} />, text: "Projects", condition: currentCompany },
    { path: "/points", icon: <RadioButtonCheckedIcon {...muiIconProps} />, text: "Points", condition: currentProject },
  ];

  function changeSidebarVisibility() {
    showSidebar ? dispatch(hideSidebarAction()) : dispatch(showSidebarAction());
    setShowSidebar((prevState) => !prevState);
  }

  // user authorized nav
  if (user) {
    return (
      <nav className="nav">
        <div className={hideSidebar ? "nav__arrow opened" : "nav__arrow"} onClick={changeSidebarVisibility}>
          <ArrowDropDownIcon sx={{ height: "30px", width: "30px" }} />
        </div>
        <CSSTransition in={hideSidebar} classNames="slide-left" timeout={600} unmountOnExit>
          <div className="nav__hidden">
            <div className="nav__item">
              <ManageAccountsIcon {...muiIconProps} />
            </div>
            <div className="nav__item" onClick={() => dispatch(logout())}>
              <PowerSettingsNewIcon {...muiIconProps} />
            </div>
            <div className="nav__white-line"> </div>
            {authorisedLinks.map(
              (link) =>
                link.condition && (
                  <NavLink key={link.text} className="nav__item hidden" to={link.path}>
                    {link.icon}
                  </NavLink>
                )
            )}
          </div>
        </CSSTransition>
        <CSSTransition in={showSidebar} classNames="slide-right" timeout={300} unmountOnExit>
          <div>
            <h2 className="nav__title">CompanyProject</h2>
            <div className="nav__item">
              <ManageAccountsIcon {...muiIconProps} />
              {user.firstName} {user.lastName}
            </div>
            <div className="nav__item" onClick={() => dispatch(logout())}>
              <PowerSettingsNewIcon {...muiIconProps} />
              Logout
            </div>
            <div className="nav__white-line"> </div>
            {authorisedLinks.map(
              (link) =>
                link.condition && (
                  <NavLink key={link.text} className="nav__item" to={link.path}>
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
    <nav className="nav">
      <div className={hideSidebar ? "nav__arrow opened" : "nav__arrow"} onClick={changeSidebarVisibility}>
        <ArrowDropDownIcon sx={{ height: "30px", width: "30px" }} />
      </div>
      {!hideSidebar && <h2 className="nav__title">CompanyProject</h2>}
      <div className="nav__hidden">
        {unAuthorisedLinks.map((link) => (
          <NavLink key={link.text} className="nav__item" to={link.path}>
            {link.icon}
            {!hideSidebar && link.text}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
