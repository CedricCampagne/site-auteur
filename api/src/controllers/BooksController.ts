import { BookService } from "../services/BookService";
import { Request, Response } from "express";

export class BooksController {
    static async getAll(req: Request, res:Response) {
        const books = await BookService.getAllBooks();
        res.json(books);
    }

    static async getRandom(req: Request, res: Response) {
        const books = await BookService.getRandom3Books();
        res.json(books);
    }

    static async getLatest(req: Request, res: Response) {
        const books = await BookService.getLatestBooks();
        res.json(books);
    }

    static async getSlug (req: Request, res: Response) {
        // const slug = req.params.slug;
        const { slug } = req.params;
        const books = await BookService.getBySlug(slug);

        if(!books){
            return res.status(404).json({ error : "Book not found"});
        }
        return res.json(books);
    }
}
