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

            // const isProd = process.env.NODE_ENV === "production";

            res
                .cookie("token", result.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    // secure: isProd,
                    // sameSite: isProd ? "none" : "lax",
                    maxAge: 1*60*60*1000,
                    path: "/"
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

            //const isProd = process.env.NODE_ENV === "production";
            
            res
                .cookie("token", result.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    // secure: isProd,
                    // sameSite: isProd ? "none" : "lax",
                    maxAge: 1*60*60*1000,
                    path: "/"
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
            const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
            if (!token){
                throw new HttpError(401, "Non authetifié");
            }
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
            res.clearCookie("token");
            return sendResponse(res, 200, "success", "Déconnexion réussie");
        } catch (error) {
            next(error);
        }
    }
}