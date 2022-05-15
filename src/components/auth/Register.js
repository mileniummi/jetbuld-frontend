import { NavLink, Navigate } from "react-router-dom";
import React, { useState } from "react";
import "../../styles/auth.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/user";

export default function Register() {
  const user = useSelector((state) => {
    return state.users.user;
  });
  const dispatch = useDispatch();
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

  return (
    <main style={{ backgroundColor: "white" }}>
      <div className="content-wrapper form-full-height">
        {!user ? (
          <>
            <div className="form-wrapper">
              <h1 className="form-greeting">Здравствуйте!</h1>
              <form className="form">
                <input name="firstName" type="text" placeholder="Имя" onChange={handleCredentialsChange} />
                <input name="lastName" type="text" placeholder="Фамилия" onChange={handleCredentialsChange} />
                <input name="email" type="email" placeholder="email" onChange={handleCredentialsChange} />
                <input name="login" type="text" placeholder="Имя в системе" onChange={handleCredentialsChange} />
                <input name="password" type="password" placeholder="Пароль" onChange={handleCredentialsChange} />
                {error && <div className="form-error-message">{error}</div>}
                <button
                  type="button"
                  className="register_button colored-button"
                  onClick={() => dispatch(register(userCredentials))}
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
