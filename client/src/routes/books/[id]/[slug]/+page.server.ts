import type { Book } from "$lib/types";
import { getByIdBook } from "$lib/api/books";


export const load = async({fetch, params }) : Promise<{ book: Book}> => {
    const { id, slug } = params;
    const book = await getByIdBook(fetch, Number(id), slug);
    return { book };
} 