import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../redux/actions/project";
import { socket } from "../../App";

const CreateProjectForm = ({ companyId, companyName, handleCreateClick }) => {
  const [error] = useState(null);
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
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form">
          <div className="form__input__wrapper">
            <input
              className="form__input"
              name="name"
              type="text"
              placeholder="Project name"
              onChange={handleCredentialsChange}
            />
            <label className={projectCredentials.name === "" ? "form__label" : "form__label active"}>
              Project name
            </label>
          </div>
          <div className="form__input__wrapper">
            <textarea
              className="form__textarea"
              name="description"
              placeholder="Project description"
              onChange={handleCredentialsChange}
            />
            <label className={projectCredentials.description === "" ? "form__label" : "form__label active"}>
              Project description
            </label>
          </div>
          {error && <div className="form-error-message">{error}</div>}
          <button
            type="button"
            className="form__button"
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
  );
};

export default CreateProjectForm;
