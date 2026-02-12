import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";
import { verifyToken } from "../utils/jwt";

export function authGuard(req: Request, res: Response, next: NextFunction){

    try {
        const token = req.cookies.token;
        if(!token){
            throw new HttpError(401, "Non authentifié");
        }
    
        const payload = verifyToken(token);
    
        if(!payload){
            throw new HttpError(401, "Token invalide ou expiré");
        }

        req.user = {
            id_user: payload.id,
            email: payload.email,
            username: payload.username,
            roles: payload.roles
        };
        
        console.log("USER FROM TOKEN (authGuard):", req.user);

        next(); 
    } catch (error) {
        next(error);
    }
}