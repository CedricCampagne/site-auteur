import { Request, Response, NextFunction } from "express";
import { ChronicleService } from "../services/ChronicleService";
import { sendResponse } from "../utils/sendResponse";
import { GetChronicleBySlugParams } from "../dto/chronicles/GetChronicleBySlug.dto";
import { GetChronicleByIdParams } from "../dto/chronicles/GetChronicleByIdParams.dto";
import { CreateChronicleDto } from "../dto/chronicles/CreateChronicle.dto";
import { UpdateChronicleDto } from "../dto/chronicles/UpdateChronicle.dto";

export class ChroniclesController {
    static async getAll(req: Request, res:Response, next: NextFunction) {
        try {
            const user = req.user;

            // Vérifie si l'utilisateur est admin
            const isAdmin = user?.roles?.includes("admin") ?? false;

            // Passe l'info au service
            const chronicles = await ChronicleService.getAllChronicles(isAdmin);
            
            return sendResponse(res, 200, "success", "Liste des chroniques récupérée", chronicles);
        } catch (error) {
            next(error);
        }
        
    }

    static async getRandom(req: Request, res: Response, next: NextFunction) {
        try {
            const chronicles = await ChronicleService.getRandom3Chronicles();

            return sendResponse(res, 200, "success", "3 chroniques aléatoires trouvées", chronicles);
        } catch (error) {
            next(error);       
        }
      
    }

    static async getLatest3(req: Request, res: Response, next: NextFunction) {
        try {
            const chronicles = await ChronicleService.getLatest3Chronicles();

            return sendResponse(res, 200, "success", "3 dernières chroniques trouvées", chronicles);
        } catch (error) {
            next(error);
        }
    }

    static async getSlug (
        req: Request<GetChronicleBySlugParams>,
        res: Response,
        next: NextFunction)
    {
        try {
            // const slug = req.params.slug;
            const { slug } = req.params;
            const chronicle = await ChronicleService.getBySlug(slug);

            return sendResponse(res, 200, "success", "Chronique trouvée", chronicle);
        } catch (error) {
            next(error);
        }
        
    }

    static async getById (
        req: Request<GetChronicleByIdParams>,
        res: Response,
        next: NextFunction)
    {
        try {
            const id = Number(req.params.id);
            const user = req.user;
            // Détermine si l'utilisateur est admin
            const isAdmin = user?.roles?.includes("admin") ?? false;

          
            // Passe l'info au service
            const chronicle = await ChronicleService.getChroniclesById(id, isAdmin);

            return sendResponse(res, 200, "success", "Chronique trouvé", chronicle);
        } catch (error) {
            next(error);
        }
    }

    static async delete(
        req: Request<GetChronicleByIdParams>,
        res: Response,
        next: NextFunction)
    {
        try {
            const id = Number(req.params.id);
            const deleted = await ChronicleService.deleteChronicle(id);
            return sendResponse(res, 200, "success", "Chronique supprimée", deleted);
        } catch (error) {
            next(error);
        }
    }

    static async update(
        req: Request<GetChronicleByIdParams, {}, UpdateChronicleDto>,
        res: Response,
        next: NextFunction)
    {
        try {
            const id = Number(req.params.id);
            const updated = await ChronicleService.updateChronicle(id, req.body);
            return sendResponse(res, 200, "success", "Chronique mise a jour", updated);
        } catch (error){
            next(error);
        } 
    }

    static async toggle(
        req: Request<GetChronicleByIdParams>,
        res: Response,
        next: NextFunction)
    {
        try {
            const id = Number(req.params.id);
            const chronicle = await ChronicleService.toggleChronicle(id);
            return sendResponse(res, 200, "success", "Statut de la chronique mis a jour", chronicle);
        } catch(error) {
            next(error);
        }
    }

    static async create(
        req: Request<{},{}, CreateChronicleDto>,
        res: Response,
        next: NextFunction)
    {
        try {
            const data = req.body;
            const chronicle = await ChronicleService.createChronicle(data);

            return sendResponse(res, 201, "success", "Chronique créée", chronicle);
        } catch (error) {
            next(error);
        }
    }
}