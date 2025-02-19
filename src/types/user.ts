export interface User {
    id: string;
    login: string;
    token?: string; // JWT или другой токен
}