import Joi from "joi";
import { AuthServices } from "../services/authService";
import { Request, Response } from "express";
import { registerSchema } from "../validators/auth/register.schema";
import { RegisterParams } from "../types/auth";

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
            res.status(400).json({message : error.message});
        }
    }
}