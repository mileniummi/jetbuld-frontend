import React, { memo } from "react";
import { nanoid } from "nanoid";
import { Pagination } from "@mui/material";
import CompanyPreview from "./CompanyPreview";
import { ITEM_LIMIT } from "@/lib/constants";
import NothingToShow from "../utils/nothingToShow";
import { ICompaniesListProps } from "@/components/companies/Companies.types";
import Loader from "@/components/UI/loader/Loader";

const CompaniesList: React.FC<ICompaniesListProps> = memo(({ page, isLoading, companies, count, handlePageChange }) => {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : count && companies ? (
        <>
          {companies.map((company) => (
            <CompanyPreview key={nanoid()} company={company} />
          ))}
          {count > ITEM_LIMIT && (
            <Pagination
              className="pagination"
              count={Math.ceil(count / ITEM_LIMIT)}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <NothingToShow message="You are not member of any company yet... Ask your manager to add you, or create one if you are company owner." />
      )}
    </div>
  );
});

export default CompaniesList;
