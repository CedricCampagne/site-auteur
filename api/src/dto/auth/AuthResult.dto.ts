import { AuthUser } from "./AuthUser.dto";

export interface AuthResult {
    user: AuthUser;
    token: string;
}