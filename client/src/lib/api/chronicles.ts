import type { ApiResponse, Chronicle } from "$lib/types";

export async function getLatest3Chronicles(fetchFn: typeof fetch): Promise<Chronicle[]> {
   const VITE_API_URL = import.meta.env.VITE_API_URL;
    if (!VITE_API_URL) throw new Error("VITE_API_URL non définie");

    const res = await fetchFn(`${VITE_API_URL}/chronicles/latest3`, {
        credentials: "include"
    });

    if(!res.ok) {
        throw new Error("Error API /latest3");
    }
    const json: ApiResponse<Chronicle[]> = await res.json();
    return json.data!;
}

export async function getAllChronicles (fetchFn: typeof fetch) : Promise<Chronicle[]> {
   const VITE_API_URL = import.meta.env.VITE_API_URL;
    if (!VITE_API_URL) throw new Error("VITE_API_URL non définie");

    const res = await fetchFn(`${VITE_API_URL}/chronicles`);
    if(!res.ok) {
        throw new Error("Errorr API/chronicles");
    }
    const json: ApiResponse<Chronicle[]> = await res.json();
    return json.data!;
}
