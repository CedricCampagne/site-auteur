import { Router } from "express";
import booksRouter from "./books.routes";
import chroniclesRouter from "./chronicles.routes";
import authRouter from "./auth.routes";
import commentRouter from "./comments.routes";
import adminRouteur from "./admin.routes";

const mainRouter = Router();

mainRouter.use('/books', booksRouter);
mainRouter.use('/chronicles', chroniclesRouter)
mainRouter.use('/auth', authRouter);
mainRouter.use('/comments', commentRouter);
mainRouter.use('/admin', adminRouteur);

export default mainRouter;