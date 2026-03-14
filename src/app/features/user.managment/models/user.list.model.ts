export interface UserListModel{
    userFullName: string;
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    userRole: string
}

export interface UserListResult{
    items: UserListModel[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}