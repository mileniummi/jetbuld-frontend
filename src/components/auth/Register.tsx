import { Navigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Button from "../UI/forms/Button";
import { useRegisterMutation } from "@/redux/services/baseApi";
import { RegisterRequest } from "@/redux/services/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { selectCurrentUser, setUserCredentials } from "@/redux/reducers/authReducer";
import { useAppError } from "@/lib/hooks/useAppError";
// @ts-ignore
import styles from "./auth.module.scss";

const formInputs = [
  { name: "firstName", placeholder: "First Name", options: {} },
  { name: "lastName", placeholder: "Last Name", options: {} },
  {
    name: "email",
    placeholder: "Email",
    options: {
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Entered value does not match email format"
      }
    }
  },
  {
    name: "login",
    placeholder: "Username",
    options: { minLength: { value: 3, message: "Username should consist at least of 3 characters" } }
  },
  {
    name: "password",
    placeholder: "Password",
    options: { minLength: { value: 5, message: "Password should consist at least of 5 characters" } }
  }
];

const defaultValues: any = {};

for (const input of formInputs) {
  defaultValues[input.name] = "";
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, mode: "onBlur" });

  const [registerUser, { error, isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleFormSubmit = async (data: RegisterRequest) => {
    if (!isLoading) {
      const response = await registerUser(data).unwrap();
      dispatch(setUserCredentials(response));
    }
  };

  const appError = useAppError(error);

  return (
    !user ? (
      <>
        <div className={styles.wrapper}>
          <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <h2 className={styles.title}>
              Set up your account
            </h2>
            {formInputs.map((input) => {
              return (
                <div key={input.name}>
                  <Input
                    type={input.name === "password" ? "password" : input.name === "email" ? "email" : "text"}
                    placeholder={input.placeholder}
                    reactHookFormRegisterRes={register(input.name, {
                      ...input.options,
                      required: "This field is required"
                    })}
                  />
                  {errors[input.name] && <Error text={errors[input.name]?.message} />}
                </div>
              );
            })}
            {appError && <div className="form-error-message">{appError && appError.data.message}</div>}
            <Button>Start using JetBuild</Button>
          </form>
        </div>
      </>
    ) : (
      <Navigate to="/" />
    )
  );
}
