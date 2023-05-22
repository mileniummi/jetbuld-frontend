import React, { memo } from "react";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Button from "../UI/forms/Button";
import { nanoid } from "nanoid";
import { CreateCompanyRequest, useAddCompanyMutation } from "@/redux/services/baseApi";
import { toast } from "react-toastify";
import { useAppError } from "@/lib/hooks/useAppError";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectCurrentUserId } from "@/redux/reducers/authReducer";

const formInputs = [
  { name: "name", placeholder: "Company name", autoFocus: true },
  { name: "description", placeholder: "Company description" },
  { name: "address", placeholder: "Company address" },
  { name: "city", placeholder: "Company city location" },
  { name: "country", placeholder: "Company country location" },
];

const defaultValues: any = {};

for (const input of formInputs) {
  defaultValues[input.name] = "";
}

interface ICreateCompanyForm {
  handleCreateCompanyClick: () => void;
}

const CreateCompanyForm = memo((props: ICreateCompanyForm) => {
  const [addCompany, { error, isLoading, isSuccess }] = useAddCompanyMutation();
  const currenUserId = useAppSelector(selectCurrentUserId);
  useAppError(error);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues, mode: "onBlur" });

  const createCompany = async (data: CreateCompanyRequest) => {
    if (!currenUserId) {
      toast.error("Current user ha no user id")
    }
    if (!isSuccess) {
      await addCompany({...data, userId: currenUserId }).unwrap();
      toast.success(`Company ${data.name} created successfully!`);
      props.handleCreateCompanyClick();
    }
  };

  return (
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit(createCompany)}>
          {formInputs.map((input) => {
            return (
              <div key={nanoid()}>
                <Input
                  autoFocus={input.autoFocus}
                  placeholder={input.placeholder}
                  reactHookFormRegisterRes={register(input.name, {
                    required: "This field is required",
                  })}
                />
                {errors[input.name] && <Error text={errors[input.name]?.message} />}
              </div>
            );
          })}
          <Button showLoader={isLoading}>Create</Button>
        </form>
      </div>
    </div>
  );
});

export default CreateCompanyForm;
