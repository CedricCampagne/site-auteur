import { CommentService } from "../services/CommentsService";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/sendResponse";
import { GetCommentsByChronicleIdParams } from "../dto/comment/GetCommentByChronicleIdParamas.dto";
import { CreateCommentDto } from "../dto/comment/CreateComment.dto";
import { GetCommentByIdParams } from "../dto/comment/GetCommentByIdParams.dto";
import { UpdateCommentDto } from "../dto/comment/UpdateComment.dto";

export class CommentController {
    static async getCommentsByChronicleId(
        req: Request<GetCommentsByChronicleIdParams>,
        res: Response,
        next: NextFunction
    ){
        try {
            const chronicle_id = Number(req.params.id);
            const comments = await CommentService.getCommentsByChronicleId(chronicle_id);

            return sendResponse(res, 200, "success", "Commentaires de la chronique récupérés", comments);

        } catch (error) {
            next(error);
        }
    }

    static async addComment(
        req: Request<{}, {}, CreateCommentDto>,
        res: Response,
        next: NextFunction
    ){
        try {
            const { content, chronicle_id} = req.body;
            const user_id = req.user.id_user;  
            const createdComment = await CommentService.addComment({
                user_id,
                chronicle_id,
                content
            })

            return sendResponse(res, 201, "success", "Commentaire ajouté", createdComment);

        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction){
        try {
            const comments = await CommentService.getAllComments();
            return sendResponse(res, 200, "success", "Tous les commentaires récupérés", comments);
        } catch (error) {
            next(error);
        }
    }

    static async getOne(
        req: Request<GetCommentByIdParams>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const comment = await CommentService.getCommentById(id);
            return sendResponse(res, 200, "success", "Commentaire récupéré", comment);
        } catch (error) {
            next(error);
        }
    }

    static async delete(
        req: Request<GetCommentByIdParams>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const deleted = await CommentService.deleteComment(id);
            return sendResponse(res, 200, "success", "Commentaire supprimé", deleted);
        } catch (error) {
            next(error);
        }
    }

    static async toggle(
        req: Request<GetCommentByIdParams>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const updated = await CommentService.toggleComment(id);
            return sendResponse(res, 200, "success", "Statut du commentaire mis à jour", updated);
        } catch(error) {
            next(error);
        }
    }

    static async update(
        req: Request<GetCommentByIdParams, {}, UpdateCommentDto>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);
            const updated = await CommentService.updateComment(id, req.body);
            return sendResponse(res, 200, "success", "Commentaire mis à jour", updated);
        } catch (error){
            next(error);
        } 
    }
}