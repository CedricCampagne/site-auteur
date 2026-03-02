import { Comment } from "../models/Comment";
import { User } from "../models/User";
import { AddBody } from "../dto/comment/AddComment.dto";
import { HttpError } from "../errors/HttpError";
import { Chronicle } from "../models/Chronicle";

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

    static async getAllComments(){
        const comments = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id_user", "username"]
                },
                {
                    model: Chronicle,
                    attributes: ["id_chronicle","title"]
                }
            ],
            order:[["created_at", "DESC"]]
        });

        return comments;
    }

    static async getCommentById(id: number) {
        const comment = await Comment.findOne({
            where: { id_comment: id },
            include: [
                { model: User, attributes: ["id_user", "username"] },
                { model: Chronicle, attributes: ["id_chronicle", "title"] }
            ]
        });

        if (!comment) {
            throw new HttpError(404, "Commentaire introuvable");
        }

        return comment;
    }

    static async deleteComment(id: number) {
        const deleted = await Comment.destroy({
            where: { id_comment: id },
        });

        if (deleted === 0) {
            throw new HttpError(404, "Commentaire introuvable");
        }

        return deleted;
    }

    static async toggleComment(id:number){
        const comment = await Comment.findOne({
            where: { id_comment: id},
            include: [
                {
                    model: User,
                    attributes: ["id_user", "username"]
                },
                {
                    model: Chronicle,
                    attributes: ["id_chronicle","title"]
                }
            ]
        });

        if (!comment) {
            throw new HttpError(404, "Aucune commentaire trouvé");
        }

        comment.is_visible = !comment.is_visible;
        await comment.save();

        return comment;
    }

    static async updateComment(id: number, data: any) {
        const comment = await Comment.findOne({ 
            where: { id_comment: id },
            include: [
                {
                    model: User,
                    attributes: ["id_user", "username"]
                },
                {
                    model: Chronicle,
                    attributes: ["id_chronicle","title"]
                }
            ]
        });
        
        if (!comment) {
            throw new HttpError(404, "Aucun commentaire trouvée");
        }

        await comment.update(data);
        
        return comment;
    }
}
