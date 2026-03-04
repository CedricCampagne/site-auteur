import { Router } from "express";

// Middlewares
import { validate } from "../middleware/validate";
import { authGuard } from "../middleware/authGuard";

// Validators
import { chronicleIdSchema } from "../validators/chronicles/id.schema";

// Controllers
import { ChroniclesController } from "../controllers/ChroniclesController";
import { CommentController } from "../controllers/CommentsController";
import { GetChronicleByIdParams } from "../dto/chronicles/GetChronicleByIdParams.dto";

const chroniclesRouter = Router();

chroniclesRouter.get("/", ChroniclesController.getAll);
chroniclesRouter.get("/latest3", ChroniclesController.getLatest3);
chroniclesRouter.get('/random3', ChroniclesController.getRandom);
chroniclesRouter.get<GetChronicleByIdParams>('/:id/:slug/comments',validate(chronicleIdSchema, "params"),authGuard,CommentController.getCommentsByChronicleId);
chroniclesRouter.get<GetChronicleByIdParams>('/:id/:slug', validate(chronicleIdSchema, "params"),authGuard, ChroniclesController.getById);

export default chroniclesRouter;