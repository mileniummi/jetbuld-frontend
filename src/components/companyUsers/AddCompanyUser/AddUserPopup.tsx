import React from "react";
import Button from "@/components/UI/forms/Button";
import { useForm } from "react-hook-form";
import Input from "@/components/UI/forms/Input";
import Error from "@/components/UI/forms/Error";
import { useAppError } from "@/lib/hooks/useAppError";
import { useInviteUserToCompanyMutation } from "@/redux/services/baseApi";

import { useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";

const AddUserPopup = ({ closeModal }: { closeModal: () => void }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "" }, mode: "onBlur" });

  const company = useAppSelector(selectSelectedCompany);
  const [inviteUser, { error, isLoading }] = useInviteUserToCompanyMutation();

  const handleFormSubmit = async (data: { email: string }) => {
    if (!isLoading && company?.id) {
      await inviteUser({ companyId: company.id, userEmail: data.email });
      if (!error) {
        closeModal();
      }
    }
  };
  const appError = useAppError(error);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
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
