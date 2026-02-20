import { Response } from "express";

export function sendResponse<T>(
    res: Response,
    type : "success" | "fail",
    payload: T | string,
    message?: string
){
    if(type === "success"){
        return res.json({
            type,
            data: typeof payload === "string" ? undefined : payload,
            message: typeof payload === "string" ? payload : message
        });
    }

    return res.json({
        type,
        message: typeof payload === "string" ? payload : message
    });
}