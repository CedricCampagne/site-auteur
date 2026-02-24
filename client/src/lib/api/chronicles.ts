import type { ApiResponse, Chronicle } from "$lib/types";

export async function getLatest3Chronicles(): Promise<Chronicle[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/chronicles/latest3`);
    if(!res.ok) {
        throw new Error("Error API /latest3");
    }
    const json: ApiResponse<Chronicle[]> = await res.json();
    return json.data!;
}

export async function getAllChronicles () : Promise<Chronicle[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/chronicles`);
    if(!res.ok) {
        throw new Error("Errorr API/chronicles");
    }
    const json: ApiResponse<Chronicle[]> = await res.json();
    return json.data!;
}
