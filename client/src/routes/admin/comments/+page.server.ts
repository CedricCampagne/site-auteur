import type { PageServerLoad } from './$types';
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

export const load : PageServerLoad = async ({fetch}) => {
    
    if (!API_URL) throw new Error("API_URL non définie");

    const res = await fetch(`${API_URL}/admin/comments`,{
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les commentaires");
    }
    const jsonComments = await res.json();
    const comments = jsonComments.data!;

    const res2 = await fetch(`${API_URL}/admin/users`,{
        credentials: "include"
    });

    if (!res2.ok) {
        throw new Error("Impossible de récupérer les utilisateurs");
    }
    const jsonUsers = await res2.json();
    const users = jsonUsers.data!;

    const res3 = await fetch(`${API_URL}/admin/chronicles`,
        { credentials: "include"
        });

    const jsonChronicles = await res3.json();
    const chronicles = jsonChronicles.data!;
    
    return { comments, users, chronicles };
}
