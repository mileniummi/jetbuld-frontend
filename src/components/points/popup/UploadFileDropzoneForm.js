import React, { useState } from "react";
import "../../../styles/popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { socket } from "../../../App";

const UploadFileForm = ({ pointId, hideForm, companyId, pointName }) => {
  const user = useSelector((state) => {
    return state.users.user;
  });
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileData, setFileData] = useState({
    name: "",
    description: "",
    userId: user.id,
    pointId,
    S3Url: "",
  });

  const updateFiles = (incommingFiles) => {
    setSelectedFiles(incommingFiles);
  };

  const handleCredentialsChange = (event) => {
    setFileData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  async function sendUserData() {
    const formData = new FormData();
    for (const prop of Object.keys(fileData)) {
      formData.append(prop, fileData[prop]);
    }
    formData.set("file", selectedFiles[0].file);
    axios
      .post("https://jetbuild-app.herokuapp.com/point/uploadfake", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        if (res.status === 201) {
          hideForm();
          socket.emit(
            companyId.toString(),
            `${user.firstName} ${user.lastName} added photo ${fileData.name} to point ${pointName}`,
            user
          );
          setError(null);
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      });
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
