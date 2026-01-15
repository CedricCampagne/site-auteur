import { BookService } from "../services/BookService";
import { Request, Response } from "express";

export class BooksController {
    static async getAll(req: Request, res:Response) {
        try {
            const books = await BookService.getAllBooks();
            
            return res.json(books);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getRandom(req: Request, res: Response) {
        try {
            const books = await BookService.getRandom3Books();            
            return res.json(books);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });        }
    }

    static async getLatest(req: Request, res: Response) {
        try {
            const book = await BookService.getLatestBook();
            if(!book){
                return res.status(404).json("Books not found")
            }
            return res.json(book);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getSlug (req: Request, res: Response) {
        try {
            // const slug = req.params.slug;
            const { slug } = req.params;
            const book = await BookService.getBySlug(slug);
            if(!book){
                return res.status(404).json({ error : "Books not found"});
            }
            return res.json(book);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getById (req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const book = await BookService.getBookById(id);
            if(!book){
                return res.status(404).json({ error: "Books not found"});
            }
            console.log("data", book);
            return res.json(book);
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: " Internal server error"});
        }       
    }
}
