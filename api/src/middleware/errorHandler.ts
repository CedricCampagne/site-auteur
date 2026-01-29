import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error("Global Error Handler:", err);

    const status:number = (err instanceof HttpError) ? err.statusCode : 500;

    res.status(status).json({message: err.message || "Internal server error"});
}