import React, { useState } from "react";
import "../../../styles/popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../App";
import { addPhoto } from "../../../redux/actions/photos";

const UploadFileForm = ({ pointId, hideForm, companyId, pointName }) => {
  const user = useSelector((state) => state.users.user);
  const error = useSelector((state) => state.app.loginError);
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileData, setFileData] = useState({
    name: "",
    description: "",
    userId: user.id,
    pointId,
    S3Url: "",
  });

  const updateFiles = (incomingFiles) => {
    setSelectedFiles(incomingFiles);
  };

  const handleCredentialsChange = (event) => {
    setFileData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  function sendUserData() {
    dispatch(addPhoto(user, fileData, selectedFiles[0].file));
    socket.emit(
      companyId.toString(),
      `${user.firstName} ${user.lastName} added photo ${fileData.name} to point ${pointName}`,
      user
    );
    hideForm();
  }

  return (
    <div className="popup-wrapper">
      <div className="popup">
        <div className="form-wrapper">
          <form className="form">
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
            <input name="name" type="text" placeholder="Photo name" onChange={handleCredentialsChange} />
            <input name="description" type="text" placeholder="Photo description" onChange={handleCredentialsChange} />
            {error && <div className="form-error-message">{error}</div>}
            <button type="button" className="register_button colored-button" onClick={sendUserData}>
              Send
            </button>
          </form>
        </div>
        <div className="popup-info">
          <FontAwesomeIcon onClick={hideForm} icon={faXmark} color="#555555" className="popup-close" />
        </div>
      </div>
    </div>
  );
};

export default UploadFileForm;
