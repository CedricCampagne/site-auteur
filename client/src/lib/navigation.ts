import type { Book, Chronicle } from "./types";

export function getBookUrl(book:Book) {
    return `/books/${book.id_book}/${book.slug}`;
}

export function getChronicleUrl(chronicle:Chronicle) {
    console.log(`/chronicles/${chronicle.id_chronicle}/${chronicle.slug}`);
    return `/chronicles/${chronicle.id_chronicle}/${chronicle.slug}`;
}