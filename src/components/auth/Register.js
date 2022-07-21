import { NavLink, Navigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { register as registerAction } from "../../redux/actions/user";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Button from "../UI/forms/Button";

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
    options: { minLength: { value: 5, message: "Password should consist at least of 3 characters" } },
  },
];

const defaultValues = {};

for (const input of formInputs) {
  defaultValues[input.name] = "";
}

export default function Register() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.app.loginError);
  const user = useSelector((state) => state.users.user);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onBlur" });

  const handleFormSubmit = (data) => {
    dispatch(registerAction(data));
  };

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
                      dataStorage={watch(input.name)}
                      reactHookFormRegisterRes={register(input.name, {
                        ...input.options,
                        required: "This field is required",
                      })}
                    />
                    {errors[input.name] && <Error text={errors[input.name].message} />}
                  </>
                );
              })}
              {error && <div className="form-error-message">{error}</div>}
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
