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

    static async addComment(req: Request, res: Response, next: NextFunction){
        try {
            const { content, chronicle_id} = req.body;
            const user_id = req.user.id_user;  

            const createdComment = await CommentService.addComment({
                user_id,
                chronicle_id,
                content
            })

            return res.status(201).json({
                success: true,
                comment: createdComment
            });

        } catch (error) {
            next(error);
        }
    }
}