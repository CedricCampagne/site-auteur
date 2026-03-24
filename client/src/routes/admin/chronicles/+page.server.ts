import type { PageServerLoad } from './$types';
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch })=>{
    if (!API_URL) throw new Error("API_URL non définie");

    const res = await fetch(`${API_URL}/admin/chronicles`, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les chroniques");
    }

    const json = await res.json();
    const chronicles = json.data!;

    return { chronicles };
}

