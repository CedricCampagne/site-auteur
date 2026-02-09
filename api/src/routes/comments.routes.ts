import { Router } from "express";
import { authGuard } from "../middleware/authGuard";
import { CommentController } from "../controllers/CommentsController";
import { validate } from "../middleware/validate";
import { addCommentSchema } from "../validators/comments/comments";

const commentRouter = Router();

commentRouter.post("/",validate(addCommentSchema,"body"), authGuard, CommentController.addComment);

export default commentRouter;