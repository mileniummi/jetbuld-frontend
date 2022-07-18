import { Navigate, NavLink } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/user";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Button from "../UI/forms/Button";

export default function Login() {
  const error = useSelector((state) => state.app.loginError);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { login: "", password: "" }, mode: "onBlur" });

  const handleFormSubmit = (data) => {
    dispatch(login(data.login, data.password));
  };

  return (
    <main style={{ backgroundColor: "white" }}>
      <div className="content-wrapper form-full-height">
        {!user ? (
          <>
            <div className="form-wrapper">
              <h1 className="form-greeting">Hello!</h1>
              <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
                <Input
                  placeholder="username"
                  dataStorage={watch("login")}
                  reactHookFormRegisterRes={register("login", {
                    required: "This field is required",
                    minLength: { value: 3, message: "Username should consist at least of 3 characters" },
                  })}
                />
                {errors.login && <Error text={errors.login.message} />}
                <Input
                  placeholder="password"
                  type="password"
                  dataStorage={watch("password")}
                  reactHookFormRegisterRes={register("password", {
                    required: "This field is required",
                    minLength: { value: 5, message: "Password should consist at least of 5 characters" },
                  })}
                />
                {errors.password && <Error text={errors.password.message} />}
                {error && <div className="form-error-message">{error}</div>}
                <Button>Login</Button>
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
