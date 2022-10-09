import React, { useState } from "react";
import Button from "@/components/UI/forms/Button";
// @ts-ignore
import styles from "./index.module.css";
import NothingToShow from "@/components/utils/nothingToShow";
import CreateCompanyForm from "@/components/companies/CreateCompanyForm";
import PopupWindow from "@/components/utils/popup/PopupWindow";
import { useGetCompaniesQuery } from "@/redux/services/baseApi";
import getOffset from "@/lib/helpers/getOffset";
import { ITEM_LIMIT } from "@/lib/constants";
import { useAppError } from "@/lib/hooks/useAppError";
import CompaniesList from "@/components/companies/CompaniesList";
import Loader from "@/components/UI/loader/Loader";

const ChooseCompanyForm = () => {
  const [createCompany, setCreateCompany] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: [count, current] = [],
    isLoading,
    error,
  } = useGetCompaniesQuery({ offset: getOffset(page), limit: ITEM_LIMIT });

  useAppError(error);

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  const handleCreateCompanyClick = () => {
    setCreateCompany((prevState) => !prevState);
  };
  return isLoading ? (
    <Loader />
  ) : current && count && current.length > 0 ? (
    <CompaniesList
      page={page}
      isLoading={isLoading}
      count={count}
      companies={current}
      handlePageChange={handlePageChange}
    />
  ) : (
    <>
      <NothingToShow message="You are not member of any company yet... Ask your manager to add you, or create one if you are company owner." />
      <div className={styles.btns}>
        <Button onClick={handleCreateCompanyClick} variant="green">
          I am owner
        </Button>
        <Button>I am employee</Button>
      </div>
      <PopupWindow transitionInState={createCompany} hideFunction={handleCreateCompanyClick}>
        <CreateCompanyForm handleCreateCompanyClick={handleCreateCompanyClick} />
      </PopupWindow>
    </>
  );
};

export default ChooseCompanyForm;
