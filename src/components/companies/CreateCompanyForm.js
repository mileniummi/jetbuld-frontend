import React, { useContext, useState } from "react";
import "../../styles/auth.css";
import axios from "axios";
import { userContext } from "../../context";

const CreateCompanyForm = ({ handleCreateCompanyClick }) => {
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(userContext);
  const [companyCredentials, setCompanyCredentials] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    country: "",
  });

  function handleCredentialsChange(event) {
    setCompanyCredentials((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  }

  function sendCompanyCredentials() {
    axios
      .post(
        "https://jetbuild-app.herokuapp.com/companies",
        companyCredentials,
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      .then((res) => {
        if (res.status === 201) {
          setError(null);
          handleCreateCompanyClick();
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
                placeholder="Company name"
                onChange={handleCredentialsChange}
              />
              <textarea
                name="description"
                placeholder="Company description"
                onChange={handleCredentialsChange}
              />
              <input
                name="address"
                type="text"
                placeholder="Company address"
                onChange={handleCredentialsChange}
              />
              <input
                name="city"
                type="text"
                placeholder="Company city location"
                onChange={handleCredentialsChange}
              />
              <input
                name="country"
                type="text"
                placeholder="Company country location"
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

export default CreateCompanyForm;
