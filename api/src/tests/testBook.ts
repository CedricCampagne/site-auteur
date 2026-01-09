import { Book } from "../models/Book"

export async function testBook() {
  console.log("=== Test Book ===");

  const book = await Book.create({
    title: "Le Livre de Test",
    slug: "le-livre-de-test",
    author: "Auteur Test",
    summary: "Résumé du livre",
    published_at: new Date("2020-01-01"),
    cover_url: "https://example.com/cover.jpg"
  });

  console.log("Book created:", book.toJSON());
}
