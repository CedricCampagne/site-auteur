import { API_URL } from "$env/static/private";
import type { Chronicle } from "$lib/types";

export async function getLatest3Chronicles(): Promise<Chronicle[]> {
    const res = await fetch(`${API_URL}/chronicles/latest3`);
    if(!res.ok) {
        throw new Error("Error API /latest3");
    }
    return await res.json();
}