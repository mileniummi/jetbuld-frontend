import React from "react";
import Button from "@/components/UI/forms/Button";
import { useForm } from "react-hook-form";
import Input from "@/components/UI/forms/Input";
import Error from "@/components/UI/forms/Error";
import { useAppError } from "@/lib/hooks/useAppError";
import { useAddUserToCompanyMutation } from "@/redux/services/baseApi";

import { useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";
import { toast } from "react-toastify";

// @ts-ignore
import styles from "./index.module.scss";

const AddUserPopup = ({ closeModal }: { closeModal: () => void }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" }, mode: "onBlur" });

  const company = useAppSelector(selectSelectedCompany);
  const [addUser, { error, isLoading }] = useAddUserToCompanyMutation();

  const handleFormSubmit = async (data: { email: string }) => {
    if (!isLoading && company?.id) {
      await addUser({ companyId: company.id, userEmail: data.email });
      if (!error) {
        toast.success(`We've sent ${data.email} an email! Please ask him to confirm joining company.`);
        closeModal();
      }
    }
  };
  const appError = useAppError(error);

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <h2 className={styles.title}>Add member</h2>
        <Input
          placeholder="email"
          type="email"
          reactHookFormRegisterRes={register("email", {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          autoFocus
        />
        {errors.email && <Error text={errors.email.message} />}
        {error && <div className="form-error-message">{appError && appError.data.message}</div>}
        <Button showLoader={isLoading}> Add user to collaborate</Button>
      </form>
    </div>
  );
};

export default AddUserPopup;
