export interface UserLogin{
    UserName: string;
    Password: string;
}
export interface LoginResult{
    loginSuccess: boolean;
    userFullName: string;
    userId: string;
}

export interface LoggedUser{
    userFullName: string;
    userId: string;
}
