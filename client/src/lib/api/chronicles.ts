import type { Chronicle } from "$lib/types";

export async function getLatest3Chronicles(): Promise<Chronicle[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/chronicles/latest3`);
    if(!res.ok) {
        throw new Error("Error API /latest3");
    }
    return await res.json();
}

export async function getAllChronicles () : Promise<Chronicle[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/chronicles`);
    if(!res.ok) {
        throw new Error("Errorr API/chronicles");
    }
    return await res.json();
}

export async function getByIdChronicle(id: number, slug:string) : Promise<Chronicle>{
    const res  = await fetch(`${import.meta.env.VITE_API_URL}/chronicles/${id}/${slug}`);
    if(!res.ok){
        throw new Error("Error API/chronicles/id/slug");
    }
    return res.json();
}