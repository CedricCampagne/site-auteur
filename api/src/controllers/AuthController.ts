import { AuthServices } from "../services/authService";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";
import { verifyToken } from "../utils/jwt";

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const  {user, token} = await AuthServices.registerUser(req.body);

            res
                .cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 1*60*60*1000 // 1h <=> 3 600 000ms
                })
                .status(201)
                .json({user});
        } catch (error: any) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {user, token} = await AuthServices.loginUser(req.body);

            res
                .cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 1*60*60*1000 // 1h <=> 3 600 000ms
                })
                .status(201)
                .json({user});
        } catch (error: any) {
            next(error);
        }
    }

    static async me(req: Request, res: Response, next: NextFunction){
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
            
            res.status(200).json({ user: payload });
        } catch (error) {
            next(error);
        }
    }
}