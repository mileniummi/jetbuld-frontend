export interface IUser {
 id: number;
 login: string;
 email: string;
 firstName: string;
 lastName: string;
 role: UserRole;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const UserRoleNameMap = {
  [UserRole.ADMIN]: "Company owner",
  [UserRole.USER]: "Frontline worker",
}
