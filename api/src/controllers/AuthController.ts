import { AuthServices } from "../services/authService";
import { Request, Response, NextFunction } from "express";

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const  {user, token} = await AuthServices.registerUser(req.body);

            res
                .cookie("token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
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
                    sameSite: "strict",
                    maxAge: 1*60*60*1000 // 1h <=> 3 600 000ms
                })
                .status(201)
                .json({user});
        } catch (error: any) {
            next(error);
        }
    }
}