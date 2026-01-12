import { Book } from "../models/Book";

export async function testBook() {
  console.log("=== Test Book ===");

  const book = await Book.create({
    title: "-Le Livre  de Test testé    ",
    author: "Auteur Test",
    summary: "Résumé du livre",
    excerpt:"voici un extrait du livre....",
    published_at: new Date("2020-01-01"),
    publisher:"Maison d'édition",
    genre:"Genre du livre en question",
    cover_url: "https://example.com/cover.jpg",
    is_active: true
  });

  console.log("Book created:", book.toJSON());
}
