import React from "react";
import Input from "../UI/forms/Input";
import { useForm } from "react-hook-form";
import Error from "../UI/forms/Error";
import Textarea from "../UI/forms/Textarea";
import Button from "../UI/forms/Button";
import { useAddProjectMutation } from "@/redux/services/baseApi";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";
import { toast } from "react-toastify";
import { useAppError } from "@/lib/hooks/useAppError";

interface ICreateProjectFormProps {
  handleCreateClick: () => void;
}

export interface CreateProjectFormData {
  name: string;
  description: string;
  city: string;
  address: string;
  country: string
}

const CreateProjectForm: React.FC<ICreateProjectFormProps> = ({ handleCreateClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { name: "", description: "", city: "", address: "", country: "" }, mode: "onBlur" });

  const [addProject, { error, isLoading, isSuccess }] = useAddProjectMutation();
  useAppError(error);
  const company = useAppSelector(selectSelectedCompany);

  const handleFormSubmit = async (data: CreateProjectFormData) => {
    if (!isSuccess) {
      await addProject({ ...data, companyId: company.id });
      toast.success(`Project ${data.name} added to company ${company.name}!`);
      handleCreateClick();
    }
  };

  return (
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            autoFocus
            placeholder={"Project Name"}
            reactHookFormRegisterRes={register("name", {
              required: "This field is required"
            })}
          />
          {errors.name && <Error text={errors.name.message} />}
          <Input
            placeholder={"Country"}
            reactHookFormRegisterRes={register("country", {
              required: "This field is required"
            })}
          />
          {errors.country && <Error text={errors.country.message} />}

          <Input
            placeholder={"City"}
            reactHookFormRegisterRes={register("city", {
              required: "This field is required"
            })}
          />
          {errors.city && <Error text={errors.city.message} />}
          <Input
            placeholder={"Address"}
            reactHookFormRegisterRes={register("address", {
              required: "This field is required"
            })}
          />
          {errors.address && <Error text={errors.address.message} />}
          <Textarea
            placeholder={"Project description"}
            reactHookFormRegisterRes={register("description", {
              required: "This field is required"
            })}
          />
          {errors.description && <Error text={errors.description.message} />}
          <Button showLoader={isLoading}>Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
