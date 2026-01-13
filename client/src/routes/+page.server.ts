import { getLatestBooks } from "../lib/api/books";
import type { Book } from '$lib/types';

export async function load(): Promise< {latestbook: Book}> {
    const latestbook = await getLatestBooks();
    return {latestbook};
}