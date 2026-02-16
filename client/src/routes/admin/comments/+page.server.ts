import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load : PageServerLoad = async ({fetch, params}) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/comments`,{
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer les commentaires");
    }

    const comments = await res.json();
    return { comments };
}
