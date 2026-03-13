import { sequelize } from "../config/database";

//Models
import { Book } from "../models/Book";

import { HttpError } from "../errors/HttpError";

//Dto
import { BookDto } from "../dto/book/Book.dto";

export class BookService {
    static async getAllBooks(): Promise<BookDto[]> {
        const books = await Book.findAll({
            order : [["published_at", "DESC"]],
            limit: 5
        });

        if(!books || books.length === 0) {
            throw new HttpError(404, "Aucun livre trouvé");
        }
        // on renvoie pas les instances sequelize on les transforme en dto
        return books.map(book => ({
            id_book: book.id_book,
            title: book.title,
            slug: book.slug,
            author: book.author,
            summary: book.summary,
            excerpt: book.excerpt,
            published_at: book.published_at.toISOString(),
            publisher: book.publisher,
            genre: book.genre,
            cover_url: book.cover_url,
            is_active : book.is_active
        }));
    }
   
    static async getRandom3Books(): Promise<BookDto[]> {
        const books = await Book.findAll({
            order: sequelize.literal("RANDOM()"),
            limit: 3
        })

        if(!books || books.length === 0) {
            throw new HttpError(404, "Aucun livre disponible");
        }

       // on renvoie pas les instances sequelize on les transforme en dto
        return books.map(book => ({
            id_book: book.id_book,
            title: book.title,
            slug: book.slug,
            author: book.author,
            summary: book.summary,
            excerpt: book.excerpt,
            published_at: book.published_at.toISOString(),
            publisher: book.publisher,
            genre: book.genre,
            cover_url: book.cover_url,
            is_active : book.is_active
        }));
    }

    static async getLatestBook(): Promise<BookDto>{
        const book = await Book.findOne({
            order: [["published_at", "DESC"]],
        })

        if (!book) {
            throw new HttpError(404, "Aucun livre récent trouvé");
        }

        return {
            id_book: book.id_book,
            title: book.title,
            slug: book.slug,
            author: book.author,
            summary: book.summary,
            excerpt: book.excerpt,
            published_at: book.published_at.toISOString(),
            publisher: book.publisher,
            genre: book.genre,
            cover_url: book.cover_url,
            is_active : book.is_active
        };
    }

    static async getBySlug(slug: string): Promise<BookDto> {
        const book = await Book.findOne({
           where: { slug }
        });

        if (!book) {
            throw new HttpError(404, "Aucun livre trouvé avec ce slug");
        }
        return {
            id_book: book.id_book,
            title: book.title,
            slug: book.slug,
            author: book.author,
            summary: book.summary,
            excerpt: book.excerpt,
            published_at: book.published_at.toISOString(),
            publisher: book.publisher,
            genre: book.genre,
            cover_url: book.cover_url,
            is_active : book.is_active
        };
    }

    static async getBookById(id:number): Promise<BookDto> {
        const book = await Book.findByPk(id);

        if (!book) {
            throw new HttpError(404, "Aucun livre trouvé avec cet ID");
        }
        
        return {
            id_book: book.id_book,
            title: book.title,
            slug: book.slug,
            author: book.author,
            summary: book.summary,
            excerpt: book.excerpt,
            published_at: book.published_at.toISOString(),
            publisher: book.publisher,
            genre: book.genre,
            cover_url: book.cover_url,
            is_active : book.is_active
        };
    }
}