import React, { useEffect } from "react";
import CompanyPreview from "./CompanyPreview";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/actions/company";
import { ITEM_LIMIT } from "../../redux/constants/app";
import { CircularProgress, Pagination } from "@mui/material";

export default function CompaniesList({ page, setPage }) {
  const companies = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const isLoading = useSelector((state) => state.app.loading);

  useEffect(() => {
    dispatch(fetchCompanies(user, page));
  }, [dispatch, page, user]);

  function handlePageChange(event, page) {
    dispatch(fetchCompanies(user, page));
    setPage(page);
  }

  return (
    <div>
      {isLoading ? (
        <div className="loader__wrapper">
          <CircularProgress color={"inherit"} />
        </div>
      ) : (
        <>
          {companies.current.map((company) => (
            <CompanyPreview key={nanoid()} company={company} />
          ))}
          {companies.count > ITEM_LIMIT && (
            <Pagination
              className="pagination"
              count={Math.ceil(companies.count / ITEM_LIMIT)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
