import Header from "../components/headers/Header";
import { useState } from "react";
import CreateCompanyForm from "../components/companies/CreateCompanyForm";
import CompaniesList from "../components/companies/CompaniesList";
import React from "react";
import PopupWindow from "../components/utils/popup/PopupWindow";

export default function Companies() {
  const [createCompany, setCreateCompany] = useState(false);
  const handleCreateCompanyClick = () => {
    setCreateCompany((prevState) => !prevState);
  };

  return (
    <>
      <Header handleCreateClick={handleCreateCompanyClick} pageLocation={"Company"} buttonText={"Add New Company"} />
      <CompaniesList />
      <PopupWindow transitionInState={createCompany} hideFunction={handleCreateCompanyClick}>
        <CreateCompanyForm handleCreateCompanyClick={handleCreateCompanyClick} />
      </PopupWindow>
    </>
  );
}
