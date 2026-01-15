import { Book } from "../models/Book";
import { sequelize } from "../config/database";

export class BookService {
    static async getAllBooks() {
        return Book.findAll();
    }

    static async getRandom3Books() {
        return Book.findAll({
            order: sequelize.literal("RANDOM()"),
            limit: 3
        })
    }

    static async getLatestBook() {
        return Book.findOne({
            order: [["published_at", "DESC"]],
        })
    }

    static async getBySlug(slug: string) {
        return Book.findOne({
           where: { slug }
        });
    }

    static async getBookById(id:number) {
        return Book.findByPk(id);
    }
}