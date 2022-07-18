import React, { useState } from "react";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";
import { addPhoto } from "../../redux/actions/photos";
import PopupWindow from "../utils/popup/PopupWindow";
import Input from "../UI/forms/Input";
import { useForm } from "react-hook-form";
import Textarea from "../UI/forms/Textarea";
import Button from "../UI/forms/Button";
import Error from "../UI/forms/Error";

const UploadFileForm = ({ active, pointId, hideForm, pointName, reload }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const error = useSelector((state) => state.app.loginError);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", description: "" }, mode: "onBlur" });
  const company = useSelector((state) => state.app.currentCompany);

  const updateFiles = (incomingFiles) => {
    setSelectedFiles(incomingFiles);
  };

  async function sendUserData(data) {
    if (selectedFiles.length !== 0) {
      await dispatch(addPhoto(user, { ...data, userId: user.id, pointId, S3Url: "" }, selectedFiles[0].file));
      socket.emit(
        company.id.toString(),
        `${user.firstName} ${user.lastName} added photo ${data.name} to point ${pointName}`,
        user
      );
      hideForm();
      reload();
    }
  }

  return (
    <PopupWindow transitionInState={active} hideFunction={hideForm}>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(sendUserData)} className="form">
          <Dropzone
            onChange={updateFiles}
            value={selectedFiles}
            style={{ minWidth: "550px", marginBottom: "30px" }}
            maxFiles={1}
            accept=".png,.jpg,.webp"
          >
            {selectedFiles.map((file) => (
              <FileItem key={nanoid()} {...file} preview />
            ))}
          </Dropzone>
          {selectedFiles.length === 0 && <Error text={"Please choose a file"} />}
          <Input
            placeholder="Photo name"
            dataStorage={watch("name")}
            reactHookFormRegisterRes={register("name", {
              required: "This field is required",
            })}
          />
          {errors.name && <Error text={errors.name.message} />}
          <Textarea
            placeholder="Photo description"
            dataStorage={watch("description")}
            reactHookFormRegisterRes={register("description", {
              required: "This field is required",
            })}
          />
          {errors.description && <Error text={errors.description.message} />}
          {error && <div className="form-error-message">{error}</div>}
          <Button>Send</Button>
        </form>
      </div>
    </PopupWindow>
  );
};

export default UploadFileForm;
