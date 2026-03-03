import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export function isAdmin<
    TParams = any,
    TResBody = any,
    TReqBody = any,
    TQuery = any
>(
    req: Request<TParams, TResBody, TReqBody, TQuery>,
    res: Response,
    next: NextFunction)
{
    try {
        const user = req.user;

        if(!user){
            throw new HttpError(401, "Non authentifié");
        }

        if (!user.roles || user.roles.length === 0) {
            throw new HttpError(403, "Aucun rôle associé à l'utilisateur");
        } 
        
        const isAdmin = user.roles.includes("admin");

        if (!isAdmin) { 
            throw new HttpError(403, "Accès réservé aux administrateurs");
        }

        next();

    } catch (error) {
        next(error);
    }
}