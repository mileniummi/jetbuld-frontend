import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../context";
import CompanyPreview from "./CompanyPreview";
import { nanoid } from "nanoid";
import { Pagination } from "@material-ui/lab";

const CompaniesList = () => {
  const { user, setUser } = useContext(userContext);
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState({ count: 0, arr: [] });
  const limit = 3;

  useEffect(() => {
    const offset = page === 1 ? 0 : page * limit - limit;
    axios
      //page = offset
      .get(`https://jetbuild-app.herokuapp.com/user/companieslist?page=${offset}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setCompanies({ count: res.data[0], arr: res.data[1] });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page, user.token]);

  const companiesPreviews = companies.arr.map((company) => <CompanyPreview key={nanoid()} company={company} />);

  function handlePageChange(event, value) {
    setPage(value);
  }

  return (
    <div>
      <Pagination
        className="pagination"
        count={Math.ceil(companies.count / limit)}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
      {companiesPreviews}
    </div>
  );
};

export default CompaniesList;
