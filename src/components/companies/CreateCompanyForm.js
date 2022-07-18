import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "../../redux/actions/company";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Button from "../UI/forms/Button";

const formInputs = [
  { name: "name", placeholder: "Company name" },
  { name: "description", placeholder: "Company description" },
  { name: "address", placeholder: "Company address" },
  { name: "city", placeholder: "Company city location" },
  { name: "country", placeholder: "Company country location" },
];

const defaultValues = {};

for (const input of formInputs) {
  defaultValues[input.name] = "";
}

const CreateCompanyForm = ({ handleCreateCompanyClick }) => {
  const dispatch = useDispatch();
  const [error] = useState(null);

  const user = useSelector((state) => {
    return state.users.user;
  });

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: defaultValues });

  const createCompany = (data) => {
    dispatch(addCompany(user, data));
    handleCreateCompanyClick();
  };

  return (
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit(createCompany)}>
          {formInputs.map((input) => {
            return (
              <>
                <Input
                  dataStorage={watch(input.name)}
                  placeholder={input.placeholder}
                  reactHookFormRegisterRes={register(input.name, {
                    required: "This field is required",
                  })}
                />
                {errors[input.name] && <Error text={errors[input.name].message} />}
              </>
            );
          })}
          {error && <div className="form-error-message">{error}</div>}
          <Button>Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCompanyForm;
