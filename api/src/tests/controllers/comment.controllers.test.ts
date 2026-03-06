import { CommentController } from "../../controllers/CommentsController";
import { CommentService } from "../../services/CommentsService";

jest.mock("../../services/CommentsService");

describe("addCommentController", ()=>{

    beforeEach(()=>{
        jest.resetAllMocks();
    })

    it("renvoie 201 et le commentaire créée", async()=>{
        // déclaration des mock req res next
        const req: any = {
            body: {
                content: "Super article",
                chronicle_id: 5
            },
            user: {
                id_user: 10
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        //Mock et comportement CommentService.addComment
        //mockResolvedValue renvoie une promesse RÉSOLUE avec cet objet
        (CommentService.addComment as jest.Mock).mockResolvedValue({
            id_comment: 1,
            content: "Super article"
        });

        // appel du vrai controller
        await CommentController.addComment(req, res, next);

        expect(CommentService.addComment).toHaveBeenCalledWith({
            user_id: 10,
            chronicle_id: 5,
            content: "Super article"
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            type: "success",
            message:"Commentaire ajouté",
            data: {
                id_comment: 1,
                content: "Super article"
            }
        });
        expect(next).not.toHaveBeenCalled();
    });

    it("appelle next avec l'erreur si le service throw", async () => {
        const req: any = {
            body: {
                content: "Super article",
                chronicle_id: 5
            },
            user: {
                id_user: 10
            }
        };

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        const error = new Error("Boom");
        //mockRejectedValue simule une promesse REJETÉE avec cette erreur "error"
        (CommentService.addComment as jest.Mock).mockRejectedValue(error);

        await CommentController.addComment(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

});