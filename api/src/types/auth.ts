export interface RegisterParams {
    username: string;
    email: string;
    password: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface AuthResult {
    user: {
        id: number;
        email: string;
        username: string;
        roles: string[];
    };
    token: string;
}
