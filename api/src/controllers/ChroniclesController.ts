import { Request, Response } from "express";
import { ChronicleService } from "../services/Chronicles";

export class ChroniclesController {
    static async getAll(req: Request, res:Response) {
        const chronicles = await ChronicleService.getAllChronicles();
        res.json(chronicles);
    }

    static async getRandom(req: Request, res: Response) {
        const chronicles = await ChronicleService.getRandom3Chronicles();
        res.json(chronicles);
    }

    static async getLatest3(req: Request, res: Response) {
        const chronicles = await ChronicleService.getLatest3tChronicles();
        res.json(chronicles);
    }

    static async getSlug (req: Request, res: Response) {
        // const slug = req.params.slug;
        const { slug } = req.params;
        const chronicles = await ChronicleService.getBySlug(slug);

        if(!chronicles){
            return res.status(404).json({ error : "Chronicle not found"});
        }
        return res.json(chronicles);
    }    
}