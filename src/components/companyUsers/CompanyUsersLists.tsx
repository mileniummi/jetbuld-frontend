import React, { useMemo, useState } from "react";
import { useGetCompanyUsersQuery } from "@/redux/services/baseApi";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import { useAppError } from "@/lib/hooks/useAppError";
import NothingToShow from "@/components/utils/nothingToShow";
// @ts-ignore
import styles from "./index.module.css";
import UserCard from "@/components/companyUsers/UserCard";

const CompanyUsersLists = () => {
  const selectedCompany = useAppSelector(selectSelectedCompany);
  const { data, isLoading, error } = useGetCompanyUsersQuery({ companyId: selectedCompany.id });
  const [tab, setTab] = useState("allUsers");

  const filteredUsers = useMemo(() => {
    if (data === undefined || !data.users) {
      return undefined;
    }
    switch (tab) {
      case "OWNER": {
        return data.users.filter((user) => user.role === "OWNER");
      }
      case "EMPLOYEE": {
        return data.users.filter((user) => user.role === "EMPLOYEE");
      }
      default: {
        return data.users;
      }
    }
  }, [data, tab]);

  useAppError(error);

  return (
    <div>
      {isLoading ? (
        <div className="loader__wrapper">
          <CircularProgress color={"inherit"} />
        </div>
      ) : (
        <div className={styles.container}>
          <Tabs sx={{ mb: "20px" }} value={tab} onChange={(_, tab) => setTab(tab)}>
            <Tab value={"allUsers"} label={"all users"} />
            <Tab value={"OWNER"} label={"owners"} />
            <Tab value={"EMPLOYEE"} label={"employees"} />
          </Tabs>
          {filteredUsers ? (
            <>
              {filteredUsers.map((companyUser, idx) => (
                <UserCard key={idx} user={companyUser.user} />
              ))}
            </>
          ) : (
            <NothingToShow message={"No users in this company yet..."} />
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyUsersLists;
