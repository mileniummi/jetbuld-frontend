import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";
import { addPoint } from "../../redux/actions/point";
import { useForm } from "react-hook-form";
import Input from "../UI/forms/Input";
import Error from "../UI/forms/Error";
import Textarea from "../UI/forms/Textarea";
import Button from "../UI/forms/Button";

const CreatePointForm = ({ handleCreateClick }) => {
  const [error] = useState(null);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const project = useSelector((state) => state.app.currentProject);
  const { company } = useSelector((state) => state.app.currentCompany);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", description: "" } });

  function sendPointCredentials(data) {
    dispatch(addPoint(user, { ...data, projectId: project.id }));
    socket.emit(
      company.id.toString(),
      `${user.firstName} ${user.lastName} added point ${data.name} in company ${company.name}`,
      user
    );
    handleCreateClick();
  }

  return (
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit(sendPointCredentials)}>
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

export default CreatePointForm;
