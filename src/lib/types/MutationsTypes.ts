import { UserType } from "./QueriesTypes";

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    token: string;
    user: UserType;
}
