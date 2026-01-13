import { Router } from "express";
import booksRouter from "./books.routes";
import chroniclesRouter from "./chronicles.routes";

const mainRouter = Router();

mainRouter.use('/books', booksRouter);
mainRouter.use('/chronicles', chroniclesRouter)

export default mainRouter;