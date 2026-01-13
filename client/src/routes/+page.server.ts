import { getLatestBook, getAllBooks } from "../lib/api/books";
import type { Book } from '$lib/types';

export async function load(): Promise< {
    latestbook: Book;
    allbooks:Book[];
}> {
    const [latestbook, allbooks] = await Promise.all([
        getLatestBook(),
        getAllBooks()
    ]);
    return { latestbook, allbooks };
}