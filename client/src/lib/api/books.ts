import type { ApiResponse, Book } from '$lib/types';

//fonction renvoie une promesse qui, une fois résolue, contiendra un tableau de Book.”
export async function getLatestBook(fetchFn: typeof fetch): Promise<Book> {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    if (!VITE_API_URL) throw new Error("VITE_API_URL non définie");

    const res = await fetchFn(`${VITE_API_URL}/books/latest`,{
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Erreur API /latest");
    }

    const json: ApiResponse<Book> = await res.json();
    return json.data!;
}

export async function getAllBooks(fetchFn: typeof fetch): Promise<Book[]> {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    if (!VITE_API_URL) throw new Error("VITE_API_URL non définie");

    const res = await fetchFn(`${VITE_API_URL}/books`, {
        credentials: "include"
    });

    if(!res.ok){
        throw new Error("Erreur API /books");
    }
    const json: ApiResponse<Book[]> = await res.json();
    return json.data!;
}

export async function getByIdBook(fetchFn: typeof fetch, id: number, slug:string) : Promise<Book> {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    if (!VITE_API_URL) throw new Error("VITE_API_URL non définie");

    const res = await fetchFn(`${VITE_API_URL}/books/${id}/${slug}`);
    if(!res.ok){
        throw new Error("Erreur API/books/id/slug");
    }
    const json: ApiResponse<Book> = await res.json();
    return json.data!;
}