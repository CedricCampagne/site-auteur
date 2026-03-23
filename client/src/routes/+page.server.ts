import { getLatestBook, getAllBooks } from "$lib/api/books";
import { getLatest3Chronicles } from "$lib/api/chronicles";
import type { Book, Chronicle } from '$lib/types';
import type { PageServerLoad } from "./$types.js";

type LoadEvent = Parameters<PageServerLoad>[0];

export const load: PageServerLoad = async (event: LoadEvent): Promise< {
    latestbook: Book;
    allbooks:Book[];
    latest3Chronicles: Chronicle[];

}> => {
    const { fetch} = event;
    const [latestbook, allbooks, latest3Chronicles] = await Promise.all([
        getLatestBook(fetch),
        getAllBooks(fetch),
        getLatest3Chronicles(fetch)
    ]);
    return { latestbook, allbooks, latest3Chronicles };
}