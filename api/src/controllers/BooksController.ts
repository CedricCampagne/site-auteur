import { BookService } from "../services/BookService";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/sendResponse";

export class BooksController {
    static async getAll(req: Request, res:Response, next: NextFunction) {
        try {
            const books = await BookService.getAllBooks();
            
            return sendResponse(res, 200, "success", "Listes des livres récupétée", books);
        } catch (error) {
            next(error);
        }
    }

    static async getRandom(req: Request, res: Response, next: NextFunction) {
        try {
            const books = await BookService.getRandom3Books();            
            return sendResponse(res, 200, "success", "Livres aléatoires récupérés", books);
        } catch (error) {
            next(error);
        }
    }

    static async getLatest(req: Request, res: Response, next: NextFunction) {
        try {
            const book = await BookService.getLatestBook();
            return sendResponse(res, 200, "success", "Dernier livre récupéré", book);
        } catch (error) {
            next(error);
        }
    }

    static async getSlug (req: Request, res: Response, next: NextFunction) {
        try {
            // const slug = req.params.slug;
            const { slug } = req.params;
            const book = await BookService.getBySlug(slug);
            return sendResponse(res, 200, "success", "Livre trouvé", book);
        } catch (error) {
            next(error);
        }
    }

    static async getById (req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const book = await BookService.getBookById(id);

            return sendResponse(res, 200, "success", "Livre trouvé", book);
        } catch (error) {
            next(error);
        }       
    }
}
