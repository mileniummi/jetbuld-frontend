import { Navigate, NavLink } from "react-router-dom";
import React, { useState } from "react";
import "../../styles/auth.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/user";

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
              <h1 className="form-greeting">Здравствуйте!</h1>
              <form className="form">
                <input
                  min={2}
                  name="login"
                  type="text"
                  placeholder="Имя пользователя"
                  onChange={handleCredentialsChange}
                />
                <input
                  min={3}
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  onChange={handleCredentialsChange}
                />
                {error && <div className="form-error-message">{error}</div>}
                <button
                  type="button"
                  className="register_button colored-button"
                  onClick={() => {
                    dispatch(login(userCredentials.login, userCredentials.password));
                  }}
                >
                  Войти
                </button>
              </form>
              <span>
                Впервые на сайте?{" "}
                <NavLink to="/register">
                  <span className="colored">Зарегистрироваться</span>
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
