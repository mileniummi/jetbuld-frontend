import React, { useContext } from "react";
import companyIcon from "../images/icons/apple-whole-solid.svg";
import userProfileIcon from "../images/icons/user-gear-solid.svg";
import { NavLink } from "react-router-dom";
import { userContext } from "../context";

export default function Sidebar() {
  const { user, setUser } = useContext(userContext);

  function logout() {
    localStorage.removeItem("user");
    setUser({});
  }

  return (
    <nav className="nav">
      <h2 className="nav__title">CompanyProject</h2>
      {Object.keys(user).length !== 0 ? (
        <div>
          <div className="nav__item">
            <img
              className="nav__item__icon"
              src={userProfileIcon}
              alt="user-icon"
            />
            {user.firstName} {user.lastName}
          </div>
          <button className="nav__button block-separator" onClick={logout}>
            Logout
          </button>
          {/*<NavLink to="/home" className="nav__item">*/}
          {/*  <img className="nav__item__icon" src={homeIcon} alt="home-icon" />*/}
          {/*  Home*/}
          {/*</NavLink>*/}
          <NavLink to="/" className="nav__item">
            <img
              className="nav__item__icon"
              src={companyIcon}
              alt="project-icon"
            />
            Companies
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink to="/login" className="nav__item">
            Login
          </NavLink>
          <NavLink to="/register" className="nav__item">
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
}
