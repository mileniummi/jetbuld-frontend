import React from "react";
import Input from "../UI/forms/Input";
import { useForm } from "react-hook-form";
import Error from "../UI/forms/Error";
import Textarea from "../UI/forms/Textarea";
import Button from "../UI/forms/Button";
import { useAddProjectMutation } from "../../redux/services/baseApi";
import { useAppSelector } from "../../lib/hooks/redux";
import { selectSelectedCompany } from "../../redux/reducers/selectedCompanyReducer";
import { toast } from "react-toastify";
import { useAppError } from "../../lib/hooks/useAppError";

interface ICreateProjectFormProps {
  handleCreateClick: () => void;
}

const CreateProjectForm: React.FC<ICreateProjectFormProps> = ({ handleCreateClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", description: "" }, mode: "onBlur" });

  const [addProject, { error, isLoading, isSuccess }] = useAddProjectMutation();
  useAppError(error);
  const company = useAppSelector(selectSelectedCompany);

  const handleFormSubmit = async (data: { name: string; description: string }) => {
    if (!isSuccess) {
      await addProject({ companyId: company.id, body: data });
      toast.success(`Project ${data.name} added to company ${company.name}!`);
      handleCreateClick();
    }
  };

  return (
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            placeholder={"Project Name"}
            reactHookFormRegisterRes={register("name", {
              required: "This field is required",
            })}
          />
          {errors.name && <Error text={errors.name.message} />}
          <Textarea
            placeholder={"Project description"}
            reactHookFormRegisterRes={register("description", {
              required: "This field is required",
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
