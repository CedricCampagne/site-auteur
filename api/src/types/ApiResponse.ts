export interface ApiResponse<T> {
    type: "success" | "fail";
    message: string;
    data?: T;
}