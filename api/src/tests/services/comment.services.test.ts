import { CommentService } from "../../services/CommentsService";
import { Comment } from "../../models/Comment";

// On dit à Jest : "remplace entièrement le module Comment par un mock"
jest.mock("../../models/Comment");

describe("CommentService.addComment", () => {

    // Pour lcear les mock entre les it
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("crée un commentaire et renvoie le DTO complet", async () => {
        const now = new Date();

        // 1) Mock de Comment.create
        // Quand addComment fera "await Comment.create()", Jest renverra cet objet
        (Comment.create as jest.Mock).mockResolvedValue({
            id_comment: 1
        });

        // 2) Mock de Comment.findOne
        // On simule le commentaire complet retourné par la DB
        (Comment.findOne as jest.Mock).mockResolvedValue({
            id_comment: 1,
            content: "Super article",
            is_visible: true,
            user_id: 10,
            chronicle_id: 5,
            created_at: now,
            updated_at: now,
            user: {
                id_user: 10,
                username: "John"
            },
            chronicle: {
                id_chronicle: 5,
                title: "Ma chronique"
            }
        });

        // 3) Appel réel de la méthode
        const result = await CommentService.addComment({
            user_id: 10,
            chronicle_id: 5,
            content: "Super article"
        });

        // 4) Vérifier que Comment.create a été appelé avec les bons arguments
        expect(Comment.create).toHaveBeenCalledWith(
            expect.objectContaining({
                user_id: 10,
                chronicle_id: 5,
                content: "Super article"
                // created_at est un new Date(), trop dur à matcher précisément → on ignore
            })
        );

        // 5) Vérifier que Comment.findOne a été appelé avec le bon where
        expect(Comment.findOne).toHaveBeenCalledWith({
            where: { id_comment: 1 },
            include: expect.any(Array) // on ne teste pas Sequelize ici
        });

        // 6) Vérifier le DTO final
        expect(result).toEqual({
            id_comment: 1,
            content: "Super article",
            is_visible: true,
            user_id: 10,
            chronicle_id: 5,
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
            user: {
                id_user: 10,
                username: "John"
            },
            chronicle: {
                id_chronicle: 5,
                title: "Ma chronique"
            }
        });
    });

    it("rejette si le contenu est vide", async () => {
        await expect(
            CommentService.addComment({
                user_id: 10,
                chronicle_id: 5,
                content: "   "
            })
        ).rejects.toThrow("Le commentaire ne peut pas être vide");

        // Vérifie que la DB n'est jamais appelée
        expect(Comment.create).not.toHaveBeenCalled();          
    });

   it("rejette si le contenu est trop court", async () => {
        await expect(
            CommentService.addComment({
                user_id: 10,
                chronicle_id: 5,
                content: "Hey" // 3 caractères → trop court
            })
        ).rejects.toThrow("Le commentaire doit contenir au moins 5 caractères");

        expect(Comment.create).not.toHaveBeenCalled();
    });

    it("rejette si user_id est manquant", async () => {
        await expect(
            CommentService.addComment({
                user_id: undefined as any,
                chronicle_id: 5,
                content: "Super article"
            })
        ).rejects.toThrow("Utilisateur non authentifié");

        expect(Comment.create).not.toHaveBeenCalled();
    });

    it("rejette si chronicle_id est manquant", async ()=>{
        await expect(
            CommentService.addComment({
                user_id: 3,
                chronicle_id: undefined as any,
                content:"Super article"
            })
        ).rejects.toThrow("Chronique introuvable");

        expect(Comment.create).not.toHaveBeenCalled();
    });
});
