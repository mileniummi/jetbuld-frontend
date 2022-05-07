import React, { useContext, useState } from "react";
import "../../styles/auth.css";
import axios from "axios";
import { userContext } from "../../context";

const CreateProjectForm = ({ companyId }) => {
  const [error, setError] = useState(null);
  const { user } = useContext(userContext);
  const [projectCredentials, setProjectCredentials] = useState({
    name: "",
    description: "",
  });

  function handleCredentialsChange(event) {
    setProjectCredentials((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function sendCompanyCredentials() {
    axios
      .post(
        `https://jetbuild-app.herokuapp.com/project/${companyId}`,
        projectCredentials,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        if (res.status === 201) {
          window.location.reload();
          setError(null);
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  }

  return (
    <div>
      <main style={{ backgroundColor: "white" }}>
        <div className="content-wrapper form-full-height">
          <div className="form-wrapper">
            <form className="form">
              <input
                name="name"
                type="text"
                placeholder="Project name"
                onChange={handleCredentialsChange}
              />
              <textarea
                name="description"
                placeholder="Project description"
                onChange={handleCredentialsChange}
              />
              {error && <div className="form-error-message">{error}</div>}
              <button
                type="button"
                className="register_button colored-button"
                onClick={sendCompanyCredentials}
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
