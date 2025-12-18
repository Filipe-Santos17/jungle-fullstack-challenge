export interface iLoginUser {
    email: string;
    password: string;
}

interface iCreateUser extends iLoginUser {
    username: string;
}