import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
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

export const actions: Actions = {
    default: async( event ) =>{
        const { request, fetch, params }= event;
        const id = params.id;

        const data = await request.formData();

        const content = data.get("content")?.toString();
        const is_visible_raw = data.get("is_visible");


        // Validation stricte côté server (comme Joi)
        if (!content || content.length < 2) {
            return fail(400, { error: "Le commentaire doit contenir au moins 2 ", values: { content } });
        }

        const is_visible = is_visible_raw === "on" ? true : false;

        try {
            const res = await fetch(`${API_URL}/admin/comments/${id}`,  {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({content, is_visible})
            });

            if (!res.ok) {
                return fail(res.status, {error: "Impossible de mettre a jour le commentaire"});
            }

            return { success: true }
        } catch (error) {
            console.log(error);
            return fail(500, { error: "Erreur serveur, veuillez réessayer plus tard" });
        }
    }
}