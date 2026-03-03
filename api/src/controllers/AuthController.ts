import { AuthServices } from "../services/authService";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";
import { verifyToken } from "../utils/jwt";
import { sendResponse } from "../utils/sendResponse";
import { RegisterParams } from "../dto/auth/RegisterParams.dto";
import { LoginParams } from "../dto/auth/LoginParams.dto";

export class AuthController {
    static async register(
        req: Request<{}, {}, RegisterParams>,
        res: Response,
        next: NextFunction)
    {
        try {
            const  result = await AuthServices.registerUser(req.body);

            res
                .cookie("token", result.token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 1*60*60*1000
                });
            
            return sendResponse(res, 201, "success","Utilisateur créé avec succès" , result.user);

        } catch (error: any) {
            next(error);
        }
    }

    static async login(
        req: Request<{}, {}, LoginParams>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await AuthServices.loginUser(req.body);

            res
                .cookie("token", result.token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 1*60*60*1000 // 1h <=> 3 600 000ms
                })
            
            sendResponse(res, 200,"success", "Connexion réussie", result.user);
        } catch (error: any) {
            next(error);
        }
    }

    static async me(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const token = req.cookies.token;
    
            if (!token){
                throw new HttpError(401, "Non authetifié");
            }
            // renvoie payload si ok sinon null
            const payload = verifyToken(token);
            
            if(!payload){
                throw new HttpError(401, "Token invalide ou expiré");
            }
            
            return sendResponse(res, 200, "success", "Utilisateur authentifié", payload);
            
        } catch (error) {
            next(error);
        }
    }

    static async logout(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            // pour l'instant rien a invalider
            console.log("le logout passe par le back(AuthController)");
            res.clearCookie("token");
            return sendResponse(res, 200, "success", "Déconnexion réussie");
        } catch (error) {
            next(error);
        }
    }
}