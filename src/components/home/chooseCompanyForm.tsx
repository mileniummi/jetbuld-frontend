import React, { useEffect, useState } from "react";
import Button from "@/components/UI/forms/Button";
// @ts-ignore
import styles from "./index.module.css";
import NothingToShow from "@/components/utils/nothingToShow";
import CreateCompanyForm from "@/components/companies/CreateCompanyForm";
import PopupWindow from "@/components/utils/popup/PopupWindow";
import { useGetCompaniesQuery, useGetCompanyUsersQuery } from "@/redux/services/baseApi";
import getOffset from "@/lib/helpers/getOffset";
import { ITEM_LIMIT } from "@/lib/constants";
import { useAppError } from "@/lib/hooks/useAppError";
import CompaniesList from "@/components/companies/CompaniesList";
import Loader from "@/components/UI/loader/Loader";
import { selectCurrentUser, setUserPrivileges } from "@/redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedCompany, setSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";

const ChooseCompanyForm = () => {
  const [createCompany, setCreateCompany] = useState(false);
  const [page, setPage] = useState(1);
  const {
    data: [count, current] = [],
    isLoading,
    error,
  } = useGetCompaniesQuery({ offset: getOffset(page), limit: ITEM_LIMIT });
  const selectedCompany = useAppSelector(selectSelectedCompany);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  useEffect(() => {
    if (current && current.length && current[0]) {
      dispatch(setSelectedCompany({ company: current[0] }));
    }
  }, [current, dispatch]);

  const { data } = useGetCompanyUsersQuery({ companyId: selectedCompany?.id }, { skip: !selectedCompany });

  useEffect(() => {
    if (data && data.users) {
      const currentUserWithRole = data.users.find((companyUser) => companyUser.userId === user.id);
      if (currentUserWithRole) {
        dispatch(setUserPrivileges(currentUserWithRole.role));
      }
    }
  }, [data, dispatch, user.userId, selectedCompany]);

  useAppError(error);

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  const handleCreateCompanyClick = () => {
    setCreateCompany((prevState) => !prevState);
  };
  // not owner

  const [infoModalOpen, setInfoModalOpen] = useState(false);

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
        <Button onClick={() => setInfoModalOpen(true)}>I am employee</Button>
      </div>
      <PopupWindow transitionInState={createCompany} hideFunction={handleCreateCompanyClick}>
        <CreateCompanyForm handleCreateCompanyClick={handleCreateCompanyClick} />
      </PopupWindow>
      <PopupWindow transitionInState={infoModalOpen} hideFunction={() => setInfoModalOpen(false)}>
        <span className={styles.info}>Please ask yor employer to add you to company by email.</span>
        <span>
          Your email: <b>{user.email}</b>
        </span>
      </PopupWindow>
    </>
  );
};

export default ChooseCompanyForm;
