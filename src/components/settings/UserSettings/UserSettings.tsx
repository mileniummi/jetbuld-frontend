import React from "react";
import Input from "@/components/UI/forms/Input";
import Error from "@/components/UI/forms/Error";
import Button from "@/components/UI/forms/Button";
import { useForm } from "react-hook-form";
import { IUser } from "@/models/User";

// @ts-ignore
import styles from "../CompanySettings/index.module.scss"
export interface UserSettingsProps {
  user: IUser;
}

export const UserSettings = ({ user }: UserSettingsProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { firstName: user.firstName, lastName: user.lastName, email: user.email, password: "" },
    mode: "onBlur"
  });

  const handleFormSubmit = async (data: any) => {

  }

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <h2 className={styles.title}>User settings</h2>
        <Input
          placeholder="firstName"
          reactHookFormRegisterRes={register("firstName", {
            required: "This field is required",
            minLength: { value: 3, message: "FirstName should consist at least of 3 characters" }
          })}
          autoFocus
        />
        {errors.firstName && <Error text={errors.firstName.message} />}
        <Input
          placeholder="lastName"
          reactHookFormRegisterRes={register("lastName", {
            required: "This field is required",
            minLength: { value: 3, message: "LastName should consist at least of 3 characters" }
          })}
        />
        {errors.lastName && <Error text={errors.lastName.message} />}
        <Input
          placeholder="email"
          reactHookFormRegisterRes={register("email", {
            required: "This field is required",
            minLength: { value: 3, message: "email should consist at least of 3 characters" }
          })}
        />
        {errors.email && <Error text={errors.email.message} />}
        <Input
          type="password"
          placeholder="password"
          reactHookFormRegisterRes={register("password", {
            required: "This field is required",
            minLength: { value: 3, message: "password should consist at least of 3 characters" }
          })}
        />
        {errors.password && <Error text={errors.password.message} />}
        <div className={styles.btn}>
          <Button>Save Changes</Button>
        </div>
      </form>
    </div>
  );
};