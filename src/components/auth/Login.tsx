import { Navigate } from "react-router-dom";
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
// @ts-ignore
import styles from "./auth.module.scss";

const Login = memo(() => {
  const [login, { error, isLoading }] = useLoginMutation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { login: "", password: "" }, mode: "onBlur" });

  const handleFormSubmit = async (data: LoginRequest) => {
    const response = await login(data).unwrap();
    dispatch(setUserCredentials(response));
  };

  const appError = useAppError(error);

  return (
    !user ? (
      <>
        <div className={styles.wrapper}>
          <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={styles.title}>Sign Up</div>
            <Input
              placeholder="username"
              reactHookFormRegisterRes={register("login", {
                required: "This field is required",
                minLength: { value: 3, message: "Username should consist at least of 3 characters" }
              })}
              autoFocus
            />
            {errors.login && <Error text={errors.login.message} />}
            <Input
              placeholder="password"
              type="password"
              reactHookFormRegisterRes={register("password", {
                required: "This field is required",
                minLength: { value: 5, message: "Password should consist at least of 5 characters" }
              })}
            />
            {errors.password && <Error text={errors.password.message} />}
            {error && <div className="form-error-message">{appError && appError.data.message}</div>}
            <Button showLoader={isLoading}>Continue</Button>
          </form>
        </div>
      </>
    ) : (
      <Navigate to="/" />
    )
  );
});

export default Login;
