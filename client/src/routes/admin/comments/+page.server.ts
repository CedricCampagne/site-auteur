import type { PageServerLoad } from './$types';

export const load : PageServerLoad = async ({fetch}) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/comments`,{
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les commentaires");
    }
    const comments = await res.json();

    const res2 = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`,{
        credentials: "include"
    });

    if (!res2.ok) {
        throw new Error("Impossible de récupérer les utilisateurs");
    }
    const users = await res2.json();

    const res3 = await fetch(`${import.meta.env.VITE_API_URL}/admin/chronicles`,
        { credentials: "include"
        });

    const chronicles = await res3.json();
    
    return { comments, users, chronicles };
}
