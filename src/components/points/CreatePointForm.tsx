import React from "react";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Textarea from "../UI/forms/Textarea";
import Button from "../UI/forms/Button";
import { useAddPointMutation } from "@/redux/services/baseApi";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";
import { selectSelectedProject } from "@/redux/reducers/selectedProjectReducer";
import { toast } from "react-toastify";
import { useAppError } from "@/lib/hooks/useAppError";

interface ICreatePointFormProps {
  handleCreateClick: () => void;
}

const CreatePointForm: React.FC<ICreatePointFormProps> = ({ handleCreateClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", description: "" }, mode: "onBlur" });

  const project = useAppSelector(selectSelectedProject);
  const company = useAppSelector(selectSelectedCompany);
  const [addPoint, { error, isLoading, isSuccess }] = useAddPointMutation();
  useAppError(error);

  async function sendPointCredentials(data: { name: string; description: string }) {
    if (!isSuccess) {
      await addPoint({ ...data, projectId: project.id });
      toast.success(`Point ${data.name} added in company ${company.name}!`);
      handleCreateClick();
    }
  }

  return (
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit(sendPointCredentials)}>
          <Input
            autoFocus
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
          <Button showLoader={isLoading}>Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePointForm;
