import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export function isAdmin(req: Request, res: Response, next: NextFunction){
    try {
        const user = req.user;

        if(!user){
            throw new HttpError(401, "Non authentifié");
        }

        if(!user.roles || !user.roles.include("admin")){
            throw new HttpError(401, "Acces non autorisé : reservé aux administrateurs");
        }

        next();

    } catch (error) {
        next(error);
    }
}