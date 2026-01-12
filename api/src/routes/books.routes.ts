import { Router } from "express";
import { BooksController } from "../controllers/BooksController";
import { validate } from "../middleware/validate";
import { slugSchema } from "../validators/books/slug.schema";

const booksRouter = Router();

booksRouter.get('/', BooksController.getAll);
booksRouter.get('/random3', BooksController.getRandom);
booksRouter.get('/latest', BooksController.getLatest);
booksRouter.get('/:slug',validate(slugSchema, "params"), BooksController.getSlug);

export default booksRouter;