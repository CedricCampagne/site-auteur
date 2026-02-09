import { Comment } from "../models/Comment";
import { User } from "../models/User";
import { AddBody } from "../types/comment";
import { HttpError } from "../errors/HttpError";

export class CommentService{
    static async getCommentsByChronicleId(chronicle_id: number){
        const comments = await Comment.findAll({
            where: {chronicle_id},
            include: [
                {
                    model: User,
                    attributes : ["id_user", "username"]
                }
            ],
            order: [["created_at", "DESC"]]
        })
        return comments;
    };

    static async addComment({user_id, chronicle_id, content}: AddBody){

        if (!content || content.trim() === "") {
            throw new HttpError(400, "Le commentaire ne peut pas être vide");
        }

        if (content.length < 5) {
            throw new HttpError(400, "Le commentaire doit contenir au moins 5 caractères");
        }

        if (content.length > 1000) {
            throw new HttpError(400, "Le commentaire ne doit pas dépasser 1000 caractères");
        }
        
        if (!user_id) {
            throw new HttpError(400, "Utilisateur non authentifié");
        }
        
        if (!chronicle_id) {
            throw new HttpError(400, "Chronique introuvable");
        }

        const comment = await Comment.create({
            user_id, chronicle_id, content, created_at: new Date()
        });
        
        return comment;
    }
}
