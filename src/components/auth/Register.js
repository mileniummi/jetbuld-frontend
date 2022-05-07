import { NavLink, Navigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context";
import "../../styles/auth.css";
import axios from "axios";

export default function Register() {
  const { user, setUser } = useContext(userContext);
  const [error, setError] = useState(null);
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
    email: "",
  });

  function handleCredentialsChange(event) {
    setUserCredentials((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function sendUserData() {
    axios
      .post("https://jetbuild-app.herokuapp.com/auth/register", userCredentials)
      .then((res) => {
        if (res.status === 201) {
          setUser({ ...res.data.user, token: res.data.token });
          setError(null);
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  }

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <main style={{ backgroundColor: "white" }}>
      <div className="content-wrapper form-full-height">
        {Object.keys(user).length === 0 ? (
          <>
            <div className="form-wrapper">
              <h1 className="form-greeting">Здравствуйте!</h1>
              <form className="form">
                <input
                  name="firstName"
                  type="text"
                  placeholder="Имя"
                  onChange={handleCredentialsChange}
                />
                <input
                  name="lastName"
                  type="text"
                  placeholder="Фамилия"
                  onChange={handleCredentialsChange}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={handleCredentialsChange}
                />
                <input
                  name="login"
                  type="text"
                  placeholder="Имя в системе"
                  onChange={handleCredentialsChange}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  onChange={handleCredentialsChange}
                />
                {error && <div className="form-error-message">{error}</div>}
                <button
                  type="button"
                  className="register_button colored-button"
                  onClick={sendUserData}
                >
                  Зарегистрироваться
                </button>
              </form>
              <span>
                Уже зарегистрированны?&nbsp;
                <NavLink to="/login">
                  <span className="colored">Войти</span>
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
