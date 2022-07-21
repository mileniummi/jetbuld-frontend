import Header from "../components/headers/Header";
import { useState } from "react";
import CreateCompanyForm from "../components/companies/CreateCompanyForm";
import CompaniesList from "../components/companies/CompaniesList";
import React from "react";
import PopupWindow from "../components/utils/popup/PopupWindow";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../redux/actions/company";

export default function Companies() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const [page, setPage] = useState(1);

  const [createCompany, setCreateCompany] = useState(false);

  const handleCreateCompanyClick = (e) => {
    setCreateCompany((prevState) => !prevState);
  };

  return (
    <>
      <Header handleCreateClick={handleCreateCompanyClick} pageLocation={"Company"} buttonText={"Add New Company"} />
      <CompaniesList page={page} setPage={setPage} />
      <PopupWindow transitionInState={createCompany} hideFunction={handleCreateCompanyClick}>
        <CreateCompanyForm
          reload={() => {
            dispatch(fetchCompanies(user, page));
          }}
          handleCreateCompanyClick={handleCreateCompanyClick}
        />
      </PopupWindow>
    </>
  );
}
