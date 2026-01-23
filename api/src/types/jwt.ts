export interface JwtPayload {
    id: number;
    email: string;
    unsername: string;
    roles: string[];
}