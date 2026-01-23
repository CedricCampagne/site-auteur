import { Book } from "../models/Book";
import { sequelize } from "../config/database";

export class BookService {
    static async getAllBooks() {
        const books = await Book.findAll({
            order : [["published_at", "DESC"]],
            limit: 5
        });

        if(!books || books.length === 0) {
            throw { status: 404, message: "Auccun livre trouvé" };
        }

        return books;
    }
   
    static async getRandom3Books() {
        const books = await Book.findAll({
            order: sequelize.literal("RANDOM()"),
            limit: 3
        })

        if(!books || books.length === 0) {
            throw { status: 404, message: "Auccun livre disponible" };
        }

        return books;
    }

    static async getLatestBook() {
        const book = await Book.findOne({
            order: [["published_at", "DESC"]],
        })

        if (!book) {
            throw { status: 404, message: "Aucun livre récent trouvé" };
        }
        return book;
    }

    static async getBySlug(slug: string) {
        const book = await Book.findOne({
           where: { slug }
        });

        if (!book) {
            throw { status: 404, message: "Aucun livre trouvé avec ce slug" };
        }
        return book;
    }

    static async getBookById(id:number) {
        const book = await Book.findByPk(id);

        if (!book) {
            throw { status: 404, message: "Aucun livre trouvé avec cet ID" };
        }
        return book;
    }
}