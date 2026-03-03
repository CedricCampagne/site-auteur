import type { Response } from "express";
import { ApiResponse } from "../dto/common/apiResponse.dto";

export function sendResponse<T>(
    res: Response,
    status: number,
    type: "success" | "fail",
    message: string,
    data?: T
) {
    const payload: ApiResponse<T> = {
        type,
        message,
        ...(data !== undefined && { data })
    };

    return res.status(status).json(payload);
}
