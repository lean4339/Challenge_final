/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
type User = {
    id: string;
    name: string;
    surname: string;
    email: string;
    password?: string;
    created_at?: date;
}
type UserLogin = Partial<User>;

type Session = {
    user: User;
    login: {token: string};
    theme: 'default' | 'green' | 'red';
    language: any;
    logged: boolean;
}