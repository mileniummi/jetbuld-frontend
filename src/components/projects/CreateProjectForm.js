import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../redux/actions/project";
import { socket } from "../../App";
import Input from "../UI/forms/Input";
import { useForm } from "react-hook-form";
import Error from "../UI/forms/Error";
import Textarea from "../UI/forms/Textarea";
import Button from "../UI/forms/Button";

const CreateProjectForm = ({ companyId, companyName, handleCreateClick }) => {
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
  } = useForm({ defaultValues: { name: "", description: "" } });

  const handleFormSubmit = (data) => {
    dispatch(addProject(companyId, user, data));
    socket.emit(
      companyId.toString(),
      `${user.firstName} ${user.lastName} added project ${data.name} to company ${companyName}`,
      user
    );
    handleCreateClick();
  };

  return (
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            dataStorage={watch("name")}
            placeholder={"Project Name"}
            reactHookFormRegisterRes={register("name", {
              required: "This field is required",
            })}
          />
          {errors.name && <Error text={errors.name.message} />}
          <Textarea
            dataStorage={watch("description")}
            placeholder={"Project description"}
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

export default CreateProjectForm;
