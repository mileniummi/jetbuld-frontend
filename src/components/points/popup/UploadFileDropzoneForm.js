import React, { useContext, useState } from "react";
import "../../../styles/popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../../../context";
import axios from "axios";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { nanoid } from "nanoid";

const UploadFileForm = ({ pointId, hideForm }) => {
  const { user } = useContext(userContext);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileData, setFileData] = useState({
    name: "",
    description: "",
    userId: user.id,
    pointId,
    S3Url: "",
  });

  function readAsArrayBuffer(e) {
    const file = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsArrayBuffer(file);
    });
  }

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
          console.log("file uploaded");
          window.location.reload();
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
            <input
              name="name"
              type="text"
              placeholder="Photo name"
              onChange={handleCredentialsChange}
            />
            <input
              name="description"
              type="text"
              placeholder="Photo description"
              onChange={handleCredentialsChange}
            />
            {error && <div className="form-error-message">{error}</div>}
            <button
              type="button"
              className="register_button colored-button"
              onClick={sendUserData}
            >
              Send
            </button>
          </form>
        </div>
        <div className="popup-info">
          <FontAwesomeIcon
            onClick={hideForm}
            icon={faXmark}
            color="#555555"
            className="popup-close"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadFileForm;
