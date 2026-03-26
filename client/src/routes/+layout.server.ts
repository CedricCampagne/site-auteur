import type { PageServerLoad } from './$types';
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

type LoadEvent = Parameters<PageServerLoad>[0];

export const load: PageServerLoad = async (event: LoadEvent) => {
    const { fetch, cookies }= event;

    if (!API_URL) throw new Error("API_URL non définie");

    const token = cookies.get("token");
    if (!token) return { user: null };

    // 🔹 Changement : ajout du token dans le header Authorization
    const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    
    if (!res.ok) return { user: null };

    const json = await res.json();
    return { user: json.data! };
};