import React from "react";
import { socket } from "../../App";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Textarea from "../UI/forms/Textarea";
import Button from "../UI/forms/Button";
import { useAddPointMutation } from "../../redux/services/baseApi";
import { useAppSelector } from "../../lib/hooks/redux";
import { selectCurrentUser } from "../../redux/reducers/authReducer";
import { selectSelectedCompany } from "../../redux/reducers/selectedCompanyReducer";
import { selectSelectedProject } from "../../redux/reducers/selectedProjectReducer";

interface ICreatePointFormProps {
  handleCreateClick: () => void;
}

const CreatePointForm: React.FC<ICreatePointFormProps> = ({ handleCreateClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", description: "" }, mode: "onBlur" });

  const user = useAppSelector(selectCurrentUser);
  const project = useAppSelector(selectSelectedProject);
  const company = useAppSelector(selectSelectedCompany);
  const [addPoint, { error, isLoading }] = useAddPointMutation();

  async function sendPointCredentials(data: { name: string; description: string }) {
    if (!isLoading) {
      await addPoint({ ...data, projectId: project.id });
      socket.emit(
        company.id.toString(),
        `${user.firstName} ${user.lastName} added point ${data.name} in company ${company.name}`,
        user
      );
      handleCreateClick();
    }
  }

  return (
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit(sendPointCredentials)}>
          <Input
            placeholder={"Point Name"}
            reactHookFormRegisterRes={register("name", {
              required: "This field is required",
            })}
          />
          {errors.name && <Error text={errors.name.message} />}
          <Textarea
            placeholder={"Point description"}
            reactHookFormRegisterRes={register("description", {
              required: "This field is required",
            })}
          />
          {errors.description && <Error text={errors.description.message} />}
          {error && <div className="form-error-message">{error}</div>}
          <Button>Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePointForm;
