import { UserCreationAttributes, UserUpdateAttributes } from "../models/User";
import { UserServices } from "../services/UserServices";
import { Request, Response, NextFunction } from "express";

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const users = await UserServices.getAllUsers();

            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number(req.params.id);
            const user = await UserServices.getUserById(id);

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction){
            try {
                const id = Number(req.params.id);
                await UserServices.deleteUser(id);
                console.log('delete (UserController)');
                return res.status(204).send();
            } catch (error) {
                next(error);
            }
    }

    static async create(req: Request, res:Response, next: NextFunction){
        try {
            const data = req.body as UserCreationAttributes;
            const user =await UserServices.createUser(data);

            res.status(201).json(user);

        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction){
        try {
            const id = Number(req.params.id);
            const data = req.body as UserUpdateAttributes;

            const updated = await UserServices.updateUser(id, data);

            res.json(updated);

        } catch (error) {
            next(error);
        }
    }

    static async toggle(req: Request, res: Response, next: NextFunction){
            try {
                const id = Number(req.params.id);
                const user = await UserServices.toggleUser(id);
                res.json(user);
            } catch(error) {
                next(error);
            }
        }
}