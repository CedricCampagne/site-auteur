import type { Book } from "$lib/types";
import { getAllBooks } from "$lib/api/books";

export async function load() : Promise< {books:Book[]}>{
   const books = await getAllBooks();
   return { books };
}