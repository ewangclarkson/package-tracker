import {UserResponse} from "./user-response.model";

export interface LoginResponse {
  accessToken: string,
  userDetails: UserResponse,
  roles: string[],
  expiresIn: string
}
