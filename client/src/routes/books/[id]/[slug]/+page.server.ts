import type { Book } from "$lib/types";
import { getByIdBook } from "$lib/api/books";


export async function load({params}) : Promise<{ book: Book}> {
    const { id, slug } = params;
    const book = await getByIdBook(Number(id), slug);
    return { book };
}