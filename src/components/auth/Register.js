import { NavLink, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/user";
import Ripple from "../UI/ripple-effect/Ripple";

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

  const formInputs = [
    { name: "firstName", placeholder: "name" },
    { name: "lastName", placeholder: "surname" },
    { name: "email", placeholder: "email" },
    { name: "login", placeholder: "username" },
    { name: "password", placeholder: "password" },
  ];

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
                {formInputs.map((input) => {
                  return (
                    <div key={input.name} className="form__input__wrapper">
                      <input
                        className="form__input"
                        name={input.name}
                        type={input.name === "password" ? "password" : "text"}
                        placeholder={input.placeholder}
                        onChange={handleCredentialsChange}
                      />
                      <label className={userCredentials[input.name] === "" ? "form__label" : "form__label active"}>
                        {input.placeholder}
                      </label>
                    </div>
                  );
                })}
                {error && <div className="form-error-message">{error}</div>}
                <button type="button" className="form__button" onClick={() => dispatch(register(userCredentials))}>
                  Register
                  <Ripple duration={700} />
                </button>
              </form>
              <span>
                Already have an account?&nbsp;
                <NavLink to="/login">
                  <span className="colored">Login</span>
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
