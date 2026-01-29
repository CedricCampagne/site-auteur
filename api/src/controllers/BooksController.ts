import { BookService } from "../services/BookService";
import { Request, Response, NextFunction } from "express";

export class BooksController {
    static async getAll(req: Request, res:Response, next: NextFunction) {
        try {
            const books = await BookService.getAllBooks();
            
            return res.json(books);
        } catch (error) {
            next(error);
        }
    }

    static async getRandom(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await BookService.getRandom3Books();            
            return res.json(books);
        } catch (error) {
            next(error);
        }
    }

    static async getLatest(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await BookService.getLatestBook();
            return res.json(book);
        } catch (error) {
            next(error);
        }
    }

    static async getSlug (req: Request, res: Response, next: NextFunction) {
        try {
            // const slug = req.params.slug;
            const { slug } = req.params;
            const book = await BookService.getBySlug(slug);
            return res.json(book);
        } catch (error) {
            next(error);
        }
    }

    static async getById (req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const book = await BookService.getBookById(id);

            return res.json(book);
        } catch (error) {
            next(error);
        }       
    }
}
