import type { PageServerLoad } from "./$types";
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad= async({ fetch, locals, cookies }) => {
    
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

    if (!API_URL) throw new Error("API_URL non définie");

    const res = await fetch(`${API_URL}/admin/users`,{
        headers: { Authorization: `Bearer ${locals.token}` }
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les utilisateurs");
    }
    
    const json = await res.json();
    const users = json.data!;
    
    return { users };
}
