import Joi from "joi";
import { AuthServices } from "../services/authService";
import { Request, Response } from "express";
import { LoginParams, RegisterParams } from "../types/auth";
import { registerSchema } from "../validators/auth/register.schema";
import { loginSchema } from "../validators/auth/login.schema";

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            // Validation schame Joi
            const data: RegisterParams = Joi.attempt(
                req.body,
                registerSchema,
                { stripUnknown: true}   // Pour enlever les champs inconnus par rappoort au schema
                );

            console.log('req body', req.body);
            const result = await AuthServices.registerUser(data);

            console.log("result", result);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({message : error.message});
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const data: LoginParams = Joi.attempt(
                req.body,
                loginSchema,
                { stripUnknown: true}
            );

            console.log('req body', req.body);
            const result = await AuthServices.loginUser(data);

            console.log("result", result);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({message : error.message});
        }
    }
}