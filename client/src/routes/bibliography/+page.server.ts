import type { Book } from "$lib/types";
import { getAllBooks } from "$lib/api/books";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ fetch }) : Promise<{ books: Book[] }> => {
    // passer le fetch injecté par SvelteKit au helper
    const books = await getAllBooks(fetch);
    return { books };
};