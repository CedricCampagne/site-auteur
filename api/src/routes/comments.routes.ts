import { Router } from "express";

// Middlecares
import { authGuard } from "../middleware/authGuard";
import { validate } from "../middleware/validate";

// Validators
import { addCommentSchema } from "../validators/comments/addComment.schema";

// Controllers
import { CommentController } from "../controllers/CommentsController";
import { CreateCommentDto } from "../dto/comment/CreateComment.dto";

const commentRouter = Router();

commentRouter.post<{}, {}, CreateCommentDto>("/", authGuard, validate(addCommentSchema,"body"),CommentController.addComment);

export default commentRouter;