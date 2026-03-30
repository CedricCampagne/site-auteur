import { redirect } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from './$types';

export const load : PageServerLoad = async ({fetch, params, locals, cookies}) => {
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

    const id = params.id;
    const res = await fetch(`${VITE_API_URL}/admin/comments/${id}`,{
        headers: { Authorization: `Bearer ${locals.token}` }
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
        const VITE_API_URL = import.meta.env.VITE_API_URL;

        const { request, fetch, params, locals }= event;
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
            const res = await fetch(`${VITE_API_URL}/admin/comments/${id}`,  {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${locals.token}`
                },
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