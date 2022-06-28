import Header from "../components/headers/Header";
import { useState } from "react";
import CreateCompanyForm from "../components/companies/CreateCompanyForm";
import CompaniesList from "../components/companies/CompaniesList";
import React from "react";
import PopupWindow from "../components/popup/PopupWindow";
import { CSSTransition } from "react-transition-group";

export default function Companies() {
  const [createCompany, setCreateCompany] = useState(false);

  const handleCreateCompanyClick = (e) => {
    setCreateCompany((prevState) => !prevState);
  };

  return (
    <main>
      <Header handleCreateClick={handleCreateCompanyClick} pageLocation={"Company"} />
      <CompaniesList />
      <CSSTransition in={createCompany} classNames="fade" timeout={300} unmountOnExit>
        <PopupWindow hideFunction={handleCreateCompanyClick}>
          <CreateCompanyForm handleCreateCompanyClick={handleCreateCompanyClick} />
        </PopupWindow>
      </CSSTransition>
    </main>
  );
}
