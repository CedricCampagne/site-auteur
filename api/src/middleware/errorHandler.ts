import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";
import { sendResponse } from "../utils/sendResponse";


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error("Global Error Handler:", err);

    if(err instanceof HttpError) {
        return sendResponse(res, err.statusCode, "fail", err.message);
    }

    return sendResponse(res, 500, "fail", "Erreur interne server");
}