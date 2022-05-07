import { Navigate, NavLink } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "../../styles/auth.css";
import { userContext } from "../../context";
import axios from "axios";

export default function Login() {
  const { user, setUser } = useContext(userContext);
  const [error, setError] = useState(null);
  const [userCredentials, setUserCredentials] = useState({
    login: "",
    password: "",
  });

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  function handleCredentialsChange(event) {
    setUserCredentials((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function sendUserData() {
    axios
      .post("https://jetbuild-app.herokuapp.com/auth/login", userCredentials)
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

  return (
    <main style={{ backgroundColor: "white" }}>
      <div className="content-wrapper form-full-height">
        {Object.keys(user).length === 0 ? (
          <>
            <div className="form-wrapper">
              <h1 className="form-greeting">Здравствуйте!</h1>
              <form className="form">
                <input
                  name="login"
                  type="text"
                  placeholder="Имя пользователя"
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
