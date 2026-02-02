import type { Book } from '$lib/types';

//fonction renvoie une promesse qui, une fois résolue, contiendra un tableau de Book.”
export async function getLatestBook(): Promise<Book> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/books/latest`);
    if (!res.ok) {
        throw new Error("Erreur API /latest");
    }
    return await res.json();
}

export async function getAllBooks(): Promise<Book[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/books`);
    if(!res.ok){
        throw new Error("Erreur API /books");
    }
    return await res.json();
}

export async function getByIdBook(id: number, slug:string) : Promise<Book> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}/${slug}`);
    if(!res.ok){
        throw new Error("Erreur API/books/id/slug");
    }
    return await res.json();
}