import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, locals, cookies })=>{
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    
    if (!locals.user) {
        cookies.set("flash", "Vous devez être connecté pour accéder à cette page", {
            path: "/",
            maxAge: 5
        });
        throw redirect(303, "/login");
    }
    if (!locals.user.roles?.includes("admin")) {
        cookies.set("flash", "Accès réservé aux administrateurs", {
            path: "/",
            maxAge: 5
        });
        throw redirect(303, "/");
    }
    
    if (!VITE_API_URL) throw new Error("API_URL non définie");

    const res = await fetch(`${VITE_API_URL}/admin/chronicles`, {
       headers: {
            Authorization: `Bearer ${locals.token}`
       }
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les chroniques");
    }

    const json = await res.json();
    const chronicles = json.data!;

    return { chronicles };
}

