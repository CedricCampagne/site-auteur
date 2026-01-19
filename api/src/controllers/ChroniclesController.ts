import { Request, Response } from "express";
import { ChronicleService } from "../services/Chronicles";

export class ChroniclesController {
    static async getAll(req: Request, res:Response) {
        try {
            const chronicles = await ChronicleService.getAllChronicles();
            if(!chronicles){
                return res.status(404).json({ error : "Chronicle not found"});
            }
            return res.json(chronicles);
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Internal server error"});
        }
        
    }

    static async getRandom(req: Request, res: Response) {
        try {
            const chronicles = await ChronicleService.getRandom3Chronicles();
            if(!chronicles){
                return res.status(404).json({ error : "Chronicle not found"});
            }
            return res.json(chronicles);
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Internal server error"});            
        }
      
    }

    static async getLatest3(req: Request, res: Response) {
        try {
            const chronicles = await ChronicleService.getLatest3tChronicles();
            if(!chronicles){
                return res.status(404).json({ error : "Chronicle not found"});
            }            
            return res.json(chronicles); 
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Internal server error"});            
        }
    }

    static async getSlug (req: Request, res: Response) {
        try {
            // const slug = req.params.slug;
        const { slug } = req.params;
        const chronicle = await ChronicleService.getBySlug(slug);

        if(!chronicle){
            return res.status(404).json({ error : "Chronicle not found"});
        }
        return res.json(chronicle);
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Internal server error"});           
        }
        
    }

    static async getById (req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const chronicle = await ChronicleService.getById(id);

            if(!chronicle) {
                return res.status(404).json('Chronicle not found');
            }
            res.json(chronicle);
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Internal server error"});
        }
    }
}