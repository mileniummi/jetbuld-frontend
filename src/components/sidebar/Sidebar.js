import React, { useState } from "react";
import companyIcon from "../../images/icons/apple-whole-solid.svg";
import shutdownIcon from "../../images/icons/turn-off-svgrepo-com.svg";
import userProfileIcon from "../../images/icons/user-gear-solid.svg";
import arrowIcon from "../../images/icons/up-arrow-svgrepo-com.svg";
import registerIcon from "../../images/icons/register-svgrepo-com.svg";
import loginIcon from "../../images/icons/login-svgrepo-com.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/user";
import "./sidebar.css";
import { CSSTransition } from "react-transition-group";

export default function Sidebar() {
  const user = useSelector((state) => state.users.user);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const dispatch = useDispatch();

  function changeSidebarVisibility() {
    setHideSidebar((prevState) => !prevState);
    setShowSidebar((prevState) => !prevState);
  }

  return (
    <nav className="nav">
      <img
        src={arrowIcon}
        alt="open-arrow"
        className={hideSidebar ? "nav__arrow opened" : "nav__arrow"}
        onClick={changeSidebarVisibility}
      />
      {user ? (
        <>
          <CSSTransition in={hideSidebar} classNames="slide-left" timeout={600} unmountOnExit>
            <div className="nav__hidden" onClick={changeSidebarVisibility}>
              <img className="nav__hidden__icon" src={userProfileIcon} alt="user-icon" />
              <img className="nav__hidden__icon" src={shutdownIcon} alt="logout-icon" />
              <div className="nav__white-line"> </div>
              <img className="nav__hidden__icon" src={companyIcon} alt="project-icon" />
            </div>
          </CSSTransition>
          <CSSTransition in={showSidebar} classNames="slide-right" timeout={300} unmountOnExit>
            <div>
              <h2 className="nav__title">CompanyProject</h2>
              <div className="nav__item">
                <img className="nav__item__icon" src={userProfileIcon} alt="user-icon" />
                {user.firstName} {user.lastName}
              </div>
              <div className="nav__item" onClick={() => dispatch(logout())}>
                <img className="nav__item__icon" src={shutdownIcon} alt="logout-icon" />
                Logout
              </div>
              <div className="nav__white-line"> </div>
              <NavLink to="/" className="nav__item">
                <img className="nav__item__icon" src={companyIcon} alt="project-icon" />
                Companies
              </NavLink>
            </div>
          </CSSTransition>
        </>
      ) : hideSidebar ? (
        <div className="nav__hidden" onClick={changeSidebarVisibility}>
          <img className="nav__hidden__icon" src={loginIcon} alt="project-icon" />
          <img className="nav__hidden__icon" src={registerIcon} alt="project-icon" />
        </div>
      ) : (
        <div>
          <h2 className="nav__title">CompanyProject</h2>
          <NavLink to="/login" className="nav__item">
            <img className="nav__item__icon" src={loginIcon} alt="project-icon" />
            Login
          </NavLink>
          <NavLink to="/register" className="nav__item">
            <img className="nav__item__icon" src={registerIcon} alt="project-icon" />
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
}
