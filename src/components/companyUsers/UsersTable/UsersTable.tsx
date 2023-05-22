import React from "react";

// @ts-ignore
import styles from "./users-table.module.scss"
import { IUser } from "@/models/User";
import UserCard from "@/components/companyUsers/UsersTable/UserCard/UserCard";
const UsersTableHeader = () => {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.headerItem}>Name</div>
      <div className={styles.headerItem}>Role</div>
      <div className={styles.headerItem}>Email</div>
    </div>
  )
}

export interface UsersTableProps {
  users: IUser[];
}


export const UsersTable = ({ users }: UsersTableProps) => {
  return (
    users.length ?
    <div>
      <UsersTableHeader />
      {users.map((user, idx) => (
        <UserCard rowIndex={idx} user={user} key={user.id} />
      ))}
    </div> : <div style={{marginTop: "20px"}}>No users found for this category...</div>
  );
};