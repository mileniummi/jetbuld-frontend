import React from "react";
import { ICompany } from "@/models/Company";
import { useForm } from "react-hook-form";
import Input from "@/components/UI/forms/Input";
import Error from "@/components/UI/forms/Error";

// @ts-ignore
import styles from "./index.module.scss"
import Button from "@/components/UI/forms/Button";
import { useUpdateCompanyMutation } from "@/redux/services/baseApi";
import { toast } from "react-toastify";
import { useAppError } from "@/lib/hooks/useAppError";

export interface UpdateCompanyFormData {
  name: string;
  description: string;
}

export interface CompanySettingsProps {
  company: ICompany;
}
export const CompanySettings = ({ company }: CompanySettingsProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { name: company.name, description: company.description }, mode: "onBlur" });

  const [updateCompany, { error, isLoading }] = useUpdateCompanyMutation();
  // useAppError(error)
  const handleFormSubmit = async (data: UpdateCompanyFormData) => {
    await updateCompany({...company, ...data}).unwrap();

    if (!error) {
      toast.success("Company credentials updated successfully!");
    }
  }


  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <h2 className={styles.title} >Company settings</h2>
        <Input
          placeholder="name"
          reactHookFormRegisterRes={register("name", {
            required: "This field is required",
            minLength: { value: 3, message: "Name should consist at least of 3 characters" }
          })}
          autoFocus
        />
        {errors.name && <Error text={errors.name.message} />}
        <Input
          placeholder="description"
          reactHookFormRegisterRes={register("description", {
            required: "This field is required",
            minLength: { value: 3, message: "Description should consist at least of 3 characters" }
          })}
        />
        {errors.description && <Error text={errors.description.message} />}
        <div className={styles.btn}>
        <Button showLoader={isLoading} >Save Changes</Button>
        </div>
      </form>
    </div>
  );
};