import { Book } from "../models/Book";
import { booksData } from "../data/dataBooks";

export async function seedBooks() {
    console.log("=== Seeding Books ===");

    for (const book of booksData) {
        await Book.create(book);
    }
}

