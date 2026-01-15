import type { Book } from "./types";

export function getBookUrl(book:Book) {
    return `/books/${book.id_book}/${book.slug}`;
}