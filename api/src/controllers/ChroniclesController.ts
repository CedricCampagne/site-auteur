import { Request, Response, NextFunction } from "express";
import { ChronicleService } from "../services/ChronicleService";

export class ChroniclesController {
    static async getAll(req: Request, res:Response, next: NextFunction) {
        try {
            const chronicles = await ChronicleService.getAllChronicles();

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
            const chronicle = await ChronicleService.getById(id);

            return res.json(chronicle);
        } catch (error) {
            next(error);
        }
    }
}