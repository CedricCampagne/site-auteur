import { Comment } from "../models/Comment";
import { User } from "../models/User";

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
            order: [["createdAt", "ASC"]]
        })
        return comments;
    };
}