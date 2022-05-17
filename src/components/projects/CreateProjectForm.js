import React, { useState } from "react";
import "../../styles/auth.css";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../redux/actions/project";
import { socket } from "../../App";

const CreateProjectForm = ({ companyId, companyName, handleCreateClick }) => {
  const [error, setError] = useState(null);
  const user = useSelector((state) => {
    return state.users.user;
  });
  const dispatch = useDispatch();
  const [projectCredentials, setProjectCredentials] = useState({
    name: "",
    description: "",
  });

  function handleCredentialsChange(event) {
    setProjectCredentials((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  return (
    <div>
      <main style={{ backgroundColor: "white" }}>
        <div className="content-wrapper form-full-height">
          <div className="form-wrapper">
            <form className="form">
              <input name="name" type="text" placeholder="Project name" onChange={handleCredentialsChange} />
              <textarea name="description" placeholder="Project description" onChange={handleCredentialsChange} />
              {error && <div className="form-error-message">{error}</div>}
              <button
                type="button"
                className="register_button colored-button"
                onClick={() => {
                  dispatch(addProject(companyId, user, projectCredentials));
                  socket.emit(
                    companyId.toString(),
                    `${user.firstName} ${user.lastName} added project ${projectCredentials.name} to company ${companyName}`,
                    user
                  );
                  handleCreateClick();
                }}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProjectForm;
