import React, { useEffect, useState } from "react";
import CompanyPreview from "./CompanyPreview";
import { nanoid } from "nanoid";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/actions/company";
import { ITEM_LIMIT } from "../../redux/constants/app";
import { CircularProgress } from "@material-ui/core";

export default function CompaniesList() {
  const companies = useSelector((state) => state.companies);
  const [page, setPage] = useState(1);
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
      <Pagination
        className="pagination"
        count={Math.ceil(companies.count / ITEM_LIMIT)}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
      {isLoading ? (
        <div className="loader__wrapper">
          <CircularProgress color={"inherit"} />
        </div>
      ) : (
        companies.current.map((company) => <CompanyPreview key={nanoid()} company={company} />)
      )}
    </div>
  );
}
