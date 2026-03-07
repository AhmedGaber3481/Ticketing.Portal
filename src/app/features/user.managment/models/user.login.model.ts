export interface UserLogin{
    UserName: string;
    Password: string;
}
export interface LoginResult{
    loginSuccess: boolean;
    userFullName: string;
    userId: string;
    email: string;
    phoneNumber: string;
}

export interface LoggedUser{
    userFullName: string;
    userId: string;
    email: string;
    phoneNumber: string;
}
