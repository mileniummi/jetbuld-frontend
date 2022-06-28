import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany } from "../../redux/actions/company";

const CreateCompanyForm = ({ handleCreateCompanyClick }) => {
  const [error] = useState(null);
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

  const formInputs = [
    { name: "name", placeholder: "Company name" },
    { name: "description", placeholder: "Company description" },
    { name: "address", placeholder: "Company address" },
    { name: "city", placeholder: "Company city location" },
    { name: "country", placeholder: "Company country location" },
  ];

  return (
    <div className="content-wrapper">
      <div className="form-wrapper">
        <form className="form">
          {formInputs.map((input) => {
            return (
              <div className="form__input__wrapper">
                <input
                  className="form__input"
                  name={input.name}
                  type={input.name === "password" ? "password" : "text"}
                  placeholder={input.placeholder}
                  onChange={handleCredentialsChange}
                />
                <label className={companyCredentials[input.name] === "" ? "form__label" : "form__label active"}>
                  {input.placeholder}
                </label>
              </div>
            );
          })}
          {error && <div className="form-error-message">{error}</div>}
          <button
            type="button"
            className="form__button"
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
  );
};

export default CreateCompanyForm;
