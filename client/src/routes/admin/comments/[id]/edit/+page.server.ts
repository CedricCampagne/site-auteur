import type { PageServerLoad } from './$types';

export const load : PageServerLoad = async ({fetch, params}) => {
    const id = params.id;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/comments/${id}`,{
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer le commentaire");
    }

    const comment = await res.json();
    return { comment };
}