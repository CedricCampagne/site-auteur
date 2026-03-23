import type { PageServerLoad } from './$types';
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

export const load : PageServerLoad = async ({fetch, params}) => {
    const id = params.id;
    const res = await fetch(`${API_URL}/admin/comments/${id}`,{
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Impossible de récupérer le commentaire");
    }

    const json = await res.json();
    const comment = json.data!;
    
    return { comment };
}