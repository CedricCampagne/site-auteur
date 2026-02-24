import { UserCreationAttributes, UserUpdateAttributes } from "../models/User";
import { UserServices } from "../services/UserServices";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/sendResponse";

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const users = await UserServices.getAllUsers();
            return sendResponse(res, 200, "success", "Tous les utilisateurs récupérés", users);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number(req.params.id);
            const user = await UserServices.getUserById(id);
            return sendResponse(res, 200, "success", "Utilisateur récupéré", user);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction){
            try {
                const id = Number(req.params.id);
                const deleted = await UserServices.deleteUser(id);
                return sendResponse(res, 200, "success", "Utilisateur supprimé", deleted);
            } catch (error) {
                next(error);
            }
    }

    static async create(req: Request, res:Response, next: NextFunction){
        try {
            const data = req.body as UserCreationAttributes;
            const user =await UserServices.createUser(data);

            return sendResponse(res, 201, "success", "Utilisateur crée", user);

        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number(req.params.id);
            const data = req.body as UserUpdateAttributes;

            const updated = await UserServices.updateUser(id, data);

            return sendResponse(res, 200, "success", "Utilisateur mis à jour", updated);

        } catch (error) {
            next(error);
        }
    }

    static async toggle(req: Request, res: Response, next: NextFunction){
            try {
                const id = Number(req.params.id);
                const updated = await UserServices.toggleUser(id);
                return sendResponse(res, 200, "success", "Status de l'utilisateur mis à jour", updated);
            } catch(error) {
                next(error);
            }
        }
}