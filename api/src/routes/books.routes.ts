import { Router } from "express";

// Middlewares
import { validate } from "../middleware/validate";

// Validators
import { bookIdSchema } from "../validators/books/bookId.schema";

// Controllers
import { BooksController } from "../controllers/BooksController";

//Dto
import { GetBookByIdParams } from "../dto/book/GetBookByIdParams.dto";

const booksRouter = Router();

booksRouter.get('/', BooksController.getAll);
booksRouter.get('/random3', BooksController.getRandom);
booksRouter.get('/latest', BooksController.getLatest);
booksRouter.get<GetBookByIdParams>('/:id/:slug',validate(bookIdSchema, "params"), BooksController.getById);

export default booksRouter;