import { Navigate, NavLink } from "react-router-dom";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Button from "../UI/forms/Button";
import { LoginRequest } from "@/redux/services/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setUserCredentials } from "@/redux/reducers/authReducer";
import { useLoginMutation } from "@/redux/services/baseApi";
import { useAppError } from "@/lib/hooks/useAppError";

const Login = memo(() => {
  const [login, { error, isLoading }] = useLoginMutation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { login: "", password: "" }, mode: "onBlur" });

  const handleFormSubmit = async (data: LoginRequest) => {
    const response = await login(data).unwrap();
    dispatch(setUserCredentials(response));
  };

  const appError = useAppError(error);

  return (
    <div className="content-wrapper">
      {!user ? (
        <>
          <div className="form-wrapper">
            <h1 className="form-greeting">Hello!</h1>
            <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
              <Input
                placeholder="username"
                reactHookFormRegisterRes={register("login", {
                  required: "This field is required",
                  minLength: { value: 3, message: "Username should consist at least of 3 characters" },
                })}
              />
              {errors.login && <Error text={errors.login.message} />}
              <Input
                placeholder="password"
                type="password"
                reactHookFormRegisterRes={register("password", {
                  required: "This field is required",
                  minLength: { value: 5, message: "Password should consist at least of 5 characters" },
                })}
              />
              {errors.password && <Error text={errors.password.message} />}
              {error && <div className="form-error-message">{appError && appError.data.message}</div>}
              <Button showLoader={isLoading}>Login</Button>
            </form>
            <span className="form__info">
              Don't have account yet?
              <NavLink to="/register">
                <span className="colored"> Register</span>
              </NavLink>
            </span>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
});

export default Login;
