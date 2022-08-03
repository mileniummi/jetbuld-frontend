import React from "react";
import Input from "../UI/forms/Input";
import { useForm } from "react-hook-form";
import Error from "../UI/forms/Error";
import Textarea from "../UI/forms/Textarea";
import Button from "../UI/forms/Button";
import { useAddProjectMutation } from "../../redux/services/baseApi";
import { socket } from "../../App";
import { useAppSelector } from "../../lib/hooks/redux";
import { selectCurrentUser } from "../../redux/reducers/authReducer";
import { selectSelectedCompany } from "../../redux/reducers/selectedCompanyReducer";

interface ICreateProjectFormProps {
  handleCreateClick: () => void;
}

const CreateProjectForm: React.FC<ICreateProjectFormProps> = ({ handleCreateClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", description: "" }, mode: "onBlur" });

  const [addProject, { error, isLoading }] = useAddProjectMutation();
  const user = useAppSelector(selectCurrentUser);
  const company = useAppSelector(selectSelectedCompany);

  const handleFormSubmit = async (data: { name: string; description: string }) => {
    if (!isLoading) {
      console.log("add project request");
      await addProject({ companyId: company.id, body: data });
      socket.emit(
        company.id.toString(),
        `${user.firstName} ${user.lastName} added project ${data.name} to company ${company.name}`,
        user
      );
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
          <Button>Create</Button>
          {error && <div className="form-error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
