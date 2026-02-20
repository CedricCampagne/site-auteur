import { Router } from "express";

// Middlecares
import { authGuard } from "../middleware/authGuard";
import { validate } from "../middleware/validate";

// Validators
import { addCommentSchema } from "../validators/comments/addComment.schema";

// Controllers
import { CommentController } from "../controllers/CommentsController";

const commentRouter = Router();

commentRouter.post("/", authGuard, validate(addCommentSchema,"body"),CommentController.addComment);

export default commentRouter;