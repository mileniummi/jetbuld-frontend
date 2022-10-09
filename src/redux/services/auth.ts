import { IUser } from "@/models/User";

export interface UserResponse {
  user: IUser;
  token: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;
}
