import { AuthServices } from "../services/authService";
import { Request, Response, NextFunction } from "express";

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AuthServices.registerUser(req.body);
            return res.status(201).json(result);
        } catch (error: any) {
            // return res.status(400).json({message : error.message});
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await AuthServices.loginUser(req.body);
            return res.status(200).json(result);
        } catch (error: any) {
            // return res.status(400).json({message : error.message});
            next(error);
        }
    }
}