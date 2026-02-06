import { CommentService } from "../services/CommentsService";
import { Request, Response, NextFunction } from "express";

export class CommentController {
    static async getCommentsByChronicleId(req: Request, res: Response, next: NextFunction){
        try {
            const chronicle_id = Number(req.params.id);

            const comments = await CommentService.getCommentsByChronicleId(chronicle_id);
            return res.status(200).json(comments);
        } catch (error) {
            next(error);
        }
    }
}