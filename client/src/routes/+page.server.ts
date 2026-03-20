import { getLatestBook, getAllBooks } from "../lib/api/books";
import { getLatest3Chronicles } from "$lib/api/chronicles";
import type { Book, Chronicle } from '$lib/types';
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async ({ fetch }): Promise< {
    latestbook: Book;
    allbooks:Book[];
    latest3Chronicles: Chronicle[];

}> => {
    const [latestbook, allbooks, latest3Chronicles] = await Promise.all([
        getLatestBook(fetch),
        getAllBooks(fetch),
        getLatest3Chronicles()
    ]);
    return { latestbook, allbooks, latest3Chronicles };
}