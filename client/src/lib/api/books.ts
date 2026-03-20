import type { ApiResponse, Book } from '$lib/types';

//fonction renvoie une promesse qui, une fois résolue, contiendra un tableau de Book.”
export async function getLatestBook(fetchFn: typeof fetch): Promise<Book> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw new Error("API_URL non définie");

    const res = await fetchFn(`${apiUrl}/books/latest`,{
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Erreur API /latest");
    }

    const json: ApiResponse<Book> = await res.json();
    return json.data!;
}

export async function getAllBooks(fetchFn: typeof fetch): Promise<Book[]> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw new Error("API_URL non définie");

    const res = await fetchFn(`${apiUrl}/books`, {
        credentials: "include"
    });

    if(!res.ok){
        throw new Error("Erreur API /books");
    }
    const json: ApiResponse<Book[]> = await res.json();
    return json.data!;
}

export async function getByIdBook(fetchFn: typeof fetch, id: number, slug:string) : Promise<Book> {
    const apiUrl = process.env.API_URL;
    if (!apiUrl) throw new Error("API_URL non définie");

    const res = await fetchFn(`${apiUrl}/books/${id}/${slug}`);
    if(!res.ok){
        throw new Error("Erreur API/books/id/slug");
    }
    const json: ApiResponse<Book> = await res.json();
    return json.data!;
}