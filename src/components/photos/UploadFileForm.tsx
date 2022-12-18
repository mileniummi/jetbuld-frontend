import React, { useState } from "react";
import { Dropzone, FileItem, FileValidated } from "@dropzone-ui/react";
import { nanoid } from "nanoid";
import { socket } from "@/App";
import PopupWindow from "../utils/popup/PopupWindow";
import Input from "../UI/forms/Input";
import { useForm } from "react-hook-form";
import Textarea from "../UI/forms/Textarea";
import Button from "../UI/forms/Button";
import Error from "../UI/forms/Error";
import { useAddPhotoMutation } from "@/redux/services/baseApi";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectCurrentUser } from "@/redux/reducers/authReducer";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";
import { toast } from "react-toastify";
import { useAppError } from "@/lib/hooks/useAppError";

interface IUploadFileFormProps {
  active: boolean;
  hideForm: () => void;
  pointId: number;
}

const UploadFileForm: React.FC<IUploadFileFormProps> = ({ active, pointId, hideForm }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileValidated[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "", description: "" }, mode: "onBlur" });

  const user = useAppSelector(selectCurrentUser);
  const company = useAppSelector(selectSelectedCompany);
  const [addPoint, { isLoading, isSuccess, error }] = useAddPhotoMutation();
  useAppError(error);

  const updateFiles = (incomingFiles: FileValidated[]) => {
    setSelectedFiles(incomingFiles);
  };

  async function sendUserData(data: { name: string; description: string }) {
    if (selectedFiles.length !== 0 && !isSuccess) {
      await addPoint({ body: { ...data, userId: user.id, pointId, S3Url: "" }, photo: selectedFiles[0].file });
      toast.success(`Photo ${data.name} has been uploaded!`);
      socket.emit(
        company.id.toString(),
        `${user.firstName} ${user.lastName} added new photo ${data.name} to point just now`,
        user
      );
      hideForm();
    }
  }

  return (
    <PopupWindow transitionInState={active} hideFunction={hideForm}>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(sendUserData)} className="form">
          <Dropzone
            onChange={updateFiles}
            value={selectedFiles}
            style={{ marginBottom: "30px" }}
            maxFiles={1}
            accept=".png,.jpg,.webp"
          >
            {selectedFiles.map((file) => (
              <FileItem key={nanoid()} {...file} preview />
            ))}
          </Dropzone>
          {selectedFiles.length === 0 && <Error text={"Please choose a file"} />}
          <Input
            autoFocus
            placeholder="Photo name"
            reactHookFormRegisterRes={register("name", {
              required: "This field is required",
            })}
          />
          {errors.name && <Error text={errors.name.message} />}
          <Textarea
            placeholder="Photo description"
            reactHookFormRegisterRes={register("description", {
              required: "This field is required",
            })}
          />
          {errors.description && <Error text={errors.description.message} />}
          <Button showLoader={isLoading}>Send</Button>
        </form>
      </div>
    </PopupWindow>
  );
};

export default UploadFileForm;
