import { Router } from "express";
import { BooksController } from "../controllers/BooksController";
import { validate } from "../middleware/validate";
import { bookIdSchema } from "../validators/books/bookId.schema";

const booksRouter = Router();

booksRouter.get('/', BooksController.getAll);
booksRouter.get('/random3', BooksController.getRandom);
booksRouter.get('/latest', BooksController.getLatest);
booksRouter.get('/:id/:slug',validate(bookIdSchema, "params"), BooksController.getById);

export default booksRouter;