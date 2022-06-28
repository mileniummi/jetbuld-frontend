import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";
import { addPoint } from "../../redux/actions/point";

const CreatePointForm = ({ projectId, companyId, companyName, handleCreateClick }) => {
  const [error] = useState(null);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const [pointCredentials, setPointCredentials] = useState({
    name: "",
    description: "",
    projectId,
  });

  function handleCredentialsChange(event) {
    setPointCredentials((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function sendPointCredentials() {
    dispatch(addPoint(user, pointCredentials));
    socket.emit(
      companyId.toString(),
      `${user.firstName} ${user.lastName} added point ${pointCredentials.name} in company ${companyName}`,
      user
    );
    handleCreateClick();
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
              placeholder="Point name"
              onChange={handleCredentialsChange}
            />
            <label className={pointCredentials.name === "" ? "form__label" : "form__label active"}>Point name</label>
          </div>
          <div className="form__input__wrapper">
            <textarea
              className="form__textarea"
              name="description"
              placeholder="Point description"
              onChange={handleCredentialsChange}
            />
            <label className={pointCredentials.description === "" ? "form__label" : "form__label active"}>
              Point description
            </label>
          </div>
          {error && <div className="form-error-message">{error}</div>}
          <button type="button" className="form__button" onClick={sendPointCredentials}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePointForm;
