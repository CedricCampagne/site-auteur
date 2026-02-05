import { Router } from "express";
import { ChroniclesController } from "../controllers/ChroniclesController";
import { chronicleIdSchema } from "../validators/chronicles/id.schema";
import { validate } from "../middleware/validate";
import { authGuard } from "../middleware/authGuard";
import { CommentController } from "../controllers/CommentsController";

const chroniclesRouter = Router();

chroniclesRouter.get("/", ChroniclesController.getAll);
chroniclesRouter.get("/latest3", ChroniclesController.getLatest3);
chroniclesRouter.get('/random3', ChroniclesController.getRandom);
chroniclesRouter.get('/:id/:slug/comments', CommentController.getCommentsByChronicleId);
chroniclesRouter.get('/:id/:slug', validate(chronicleIdSchema, "params"),authGuard, ChroniclesController.getById);

export default chroniclesRouter;