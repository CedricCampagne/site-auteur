import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

export const load : PageServerLoad = async ({fetch, locals, cookies}) => {
    
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

    const res = await fetch(`${API_URL}/admin/comments`,{
       headers: { Authorization: `Bearer ${locals.token}` }
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les commentaires");
    }
    const jsonComments = await res.json();
    const comments = jsonComments.data!;

    const res2 = await fetch(`${API_URL}/admin/users`,{
        headers: { Authorization: `Bearer ${locals.token}` }
    });

    if (!res2.ok) {
        throw new Error("Impossible de récupérer les utilisateurs");
    }
    const jsonUsers = await res2.json();
    const users = jsonUsers.data!;

    const res3 = await fetch(`${API_URL}/admin/chronicles`,{ 
        headers: { Authorization: `Bearer ${locals.token}` }
        });

    if (!res3.ok) {
        throw new Error("Impossible de récupérer les chroniques");
    }

    const jsonChronicles = await res3.json();
    const chronicles = jsonChronicles.data!;
    
    return { comments, users, chronicles };
}
