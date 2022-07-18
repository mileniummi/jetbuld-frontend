import { Navigate, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/user";
import Ripple from "../UI/ripple-effect/Ripple";

export default function Login() {
  const error = useSelector((state) => state.app.loginError);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const [userCredentials, setUserCredentials] = useState({
    login: "",
    password: "",
  });

  function handleCredentialsChange(event) {
    setUserCredentials((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  return (
    <main style={{ backgroundColor: "white" }}>
      <div className="content-wrapper form-full-height">
        {!user ? (
          <>
            <div className="form-wrapper">
              <h1 className="form-greeting">Hello!</h1>
              <form className="form">
                <div className="form__input__wrapper">
                  <input
                    className="form__input"
                    min={2}
                    name="login"
                    type="text"
                    placeholder="username"
                    onChange={handleCredentialsChange}
                  />
                  <label className={userCredentials.login === "" ? "form__label" : "form__label active"}>
                    username
                  </label>
                </div>
                <div className="form__input__wrapper">
                  <input
                    min={3}
                    name="password"
                    type="password"
                    placeholder="password"
                    className="form__input"
                    onChange={handleCredentialsChange}
                  />
                  <label className={userCredentials.password === "" ? "form__label" : "form__label active"}>
                    password
                  </label>
                </div>
                {error && <div className="form-error-message">{error}</div>}
                <button
                  type="button"
                  className="form__button"
                  onClick={() => {
                    dispatch(login(userCredentials.login, userCredentials.password));
                  }}
                >
                  Login
                  <Ripple duration={700} />
                </button>
              </form>
              <span>
                Don't have account yet?
                <NavLink to="/register">
                  <span className="colored">Register</span>
                </NavLink>
              </span>
            </div>
          </>
        ) : (
          <Navigate to="/" />
        )}
      </div>
    </main>
  );
}
