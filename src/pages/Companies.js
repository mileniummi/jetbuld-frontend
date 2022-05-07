import Header from "../components/Header";
import { useState } from "react";
import CreateCompanyForm from "../components/companies/CreateCompanyForm";
import CompaniesList from "../components/companies/CompaniesList";
import React from "react"

export default function Companies() {
  const [createCompany, setCreateCompany] = useState(false);

  const handleCreateCompanyClick = (e) => {
    setCreateCompany((prevState) => !prevState);
  };

  return (
    <main>
      <Header
        handleCreateClick={handleCreateCompanyClick}
        pageLocation={"Company"}
      />
      {createCompany ? (
        <CreateCompanyForm
          handleCreateCompanyClick={handleCreateCompanyClick}
        />
      ) : (
        <CompaniesList />
      )}
    </main>
  );
}
