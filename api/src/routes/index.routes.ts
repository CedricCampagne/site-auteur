import { Router } from "express";
import booksRouter from "./books.routes";

const mainRouter = Router();

mainRouter.use('/books', booksRouter);

export default mainRouter;