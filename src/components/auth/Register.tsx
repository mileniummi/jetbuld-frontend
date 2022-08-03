import { NavLink, Navigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Button from "../UI/forms/Button";
import { useRegisterMutation } from "../../redux/services/baseApi";
import { RegisterRequest } from "../../redux/services/auth";
import { useAppDispatch, useAppSelector } from "../../lib/hooks/redux";
import { selectCurrentUser, setUserCredentials } from "../../redux/reducers/authReducer";
import { useAppError } from "../../lib/hooks/useAppError";

const formInputs = [
  { name: "firstName", placeholder: "name", options: {} },
  { name: "lastName", placeholder: "surname", options: {} },
  {
    name: "email",
    placeholder: "email",
    options: {
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Entered value does not match email format",
      },
    },
  },
  {
    name: "login",
    placeholder: "username",
    options: { minLength: { value: 3, message: "Username should consist at least of 3 characters" } },
  },
  {
    name: "password",
    placeholder: "password",
    options: { minLength: { value: 5, message: "Password should consist at least of 5 characters" } },
  },
];

const defaultValues: any = {};

for (const input of formInputs) {
  defaultValues[input.name] = "";
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    <div className="content-wrapper">
      {!user ? (
        <>
          <div className="form-wrapper">
            <h1 className="form-greeting">Hello!</h1>
            <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
              {formInputs.map((input) => {
                return (
                  <>
                    <Input
                      type={input.name === "password" ? "password" : input.name === "email" ? "email" : "text"}
                      placeholder={input.placeholder}
                      reactHookFormRegisterRes={register(input.name, {
                        ...input.options,
                        required: "This field is required",
                      })}
                    />
                    {errors[input.name] && <Error text={errors[input.name]?.message} />}
                  </>
                );
              })}
              {appError && <div className="form-error-message">{appError && appError.data.message}</div>}
              <Button>Register</Button>
            </form>
            <span className="form__info">
              Already have an account?
              <NavLink to="/login">
                <span className="colored"> Login</span>
              </NavLink>
            </span>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
