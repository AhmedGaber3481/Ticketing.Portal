export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
    notifications?: string[]; // Optional notifications array
    status: number; // HTTP status code
}