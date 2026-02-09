import { Request, Response, NextFunction } from "express";
import { ChronicleService } from "../services/ChronicleService";
import { Role } from "../models/Role";

export class ChroniclesController {
    static async getAll(req: Request, res:Response, next: NextFunction) {
        try {
            const user = req.user;

            // Vérifie si l'utilisateur est admin
            const isAdmin = user?.roles?.some((role: Role) => role.name === "admin") ?? false;

            // Passe l'info au service
            const chronicles = await ChronicleService.getAllChronicles(isAdmin);

            return res.json(chronicles);
        } catch (error) {
            next(error);
        }
        
    }

    static async getRandom(req: Request, res: Response, next: NextFunction) {
        try {
            const chronicles = await ChronicleService.getRandom3Chronicles();

            return res.json(chronicles);
        } catch (error) {
            next(error);       
        }
      
    }

    static async getLatest3(req: Request, res: Response, next: NextFunction) {
        try {
            const chronicles = await ChronicleService.getLatest3Chronicles();

            return res.json(chronicles); 
        } catch (error) {
            next(error);
        }
    }

    static async getSlug (req: Request, res: Response, next: NextFunction) {
        try {
            // const slug = req.params.slug;
            const { slug } = req.params;
            const chronicle = await ChronicleService.getBySlug(slug);

            return res.json(chronicle);
        } catch (error) {
            next(error);
        }
        
    }

    static async getById (req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const user = req.user; // Détermine si l'utilisateur est admin
            const isAdmin = user?.roles?.some((role: Role) => role.name === "admin") ?? false; 
          
            // Passe l'info au service
            const chronicle = await ChronicleService.getChroniclesById(id, isAdmin);

            return res.json(chronicle);
        } catch (error) {
            next(error);
        }
    }
}