import React, { useState } from "react";
import "../../styles/auth.css";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "../../redux/actions/company";

const CreateCompanyForm = ({ handleCreateCompanyClick }) => {
  const [error, setError] = useState(null);
  const user = useSelector((state) => {
    return state.users.user;
  });
  const dispatch = useDispatch();
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

  return (
    <div>
      <main style={{ backgroundColor: "white" }}>
        <div className="content-wrapper form-full-height">
          <div className="form-wrapper">
            <form className="form">
              <input name="name" type="text" placeholder="Company name" onChange={handleCredentialsChange} />
              <textarea name="description" placeholder="Company description" onChange={handleCredentialsChange} />
              <input name="address" type="text" placeholder="Company address" onChange={handleCredentialsChange} />
              <input name="city" type="text" placeholder="Company city location" onChange={handleCredentialsChange} />
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
                onClick={() => {
                  dispatch(addCompany(user, companyCredentials));
                  handleCreateCompanyClick();
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

export default CreateCompanyForm;
