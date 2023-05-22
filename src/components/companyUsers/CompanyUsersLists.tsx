import React, { useMemo, useState } from "react";
import { useGetCompanyUsersQuery } from "@/redux/services/baseApi";
import { useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedCompany } from "@/redux/reducers/selectedCompanyReducer";
import { CircularProgress, Tab, Tabs } from "@mui/material";
import { useAppError } from "@/lib/hooks/useAppError";
import NothingToShow from "@/components/utils/nothingToShow";
// @ts-ignore
import styles from "./index.module.css";
import { UsersTable } from "@/components/companyUsers/UsersTable/UsersTable";
import { UserRole } from "@/models/User";

const CompanyUsersLists = () => {
  const selectedCompany = useAppSelector(selectSelectedCompany);
  const { data, isLoading, error } = useGetCompanyUsersQuery(selectedCompany.id);
  const [tab, setTab] = useState("allUsers");

  const filteredUsers = useMemo(() => {
    if (!data) {
      return [];
    }
    switch (tab) {
      case UserRole.ADMIN: {
        return data.filter((user) => user.role === UserRole.ADMIN);
      }
      case UserRole.USER: {
        return data.filter((user) => user.role === UserRole.USER);
      }
      default: {
        return data;
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
            <Tab value={"allUsers"} label={"all members"} />
            <Tab value={UserRole.ADMIN} label={"managers"} />
            <Tab value={UserRole.USER} label={"workers"} />
          </Tabs>
          <div className={styles.users}>
            {data?.length ? (
              <UsersTable users={filteredUsers} />
            ) : (
              <NothingToShow message={"No users in this company yet..."} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyUsersLists;
