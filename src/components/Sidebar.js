import React from "react";
import companyIcon from "../images/icons/apple-whole-solid.svg";
import userProfileIcon from "../images/icons/user-gear-solid.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/user";

export default function Sidebar() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  return (
    <nav className="nav">
      <h2 className="nav__title">CompanyProject</h2>
      {user ? (
        <div>
          <div className="nav__item">
            <img className="nav__item__icon" src={userProfileIcon} alt="user-icon" />
            {user.firstName} {user.lastName}
          </div>
          <button className="nav__button block-separator" onClick={() => dispatch(logout())}>
            Logout
          </button>
          {/*<NavLink to="/home" className="nav__item">*/}
          {/*  <img className="nav__item__icon" src={homeIcon} alt="home-icon" />*/}
          {/*  Home*/}
          {/*</NavLink>*/}
          <NavLink to="/" className="nav__item">
            <img className="nav__item__icon" src={companyIcon} alt="project-icon" />
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
