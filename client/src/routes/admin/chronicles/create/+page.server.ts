import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

export const actions: Actions = {
    default: async( event )=> {
        const { request, fetch } = event;

        const data = await request.formData();

        
        const title = data.get("title")?.toString();
        const quote = data.get("quote")?.toString();
        const summary = data.get("summary")?.toString();
        const content = data.get("content")?.toString();
        const cover_url = data.get("cover_url")?.toString();
        const published_at = data.get("published_at")?.toString();
        const is_active_raw = data.get("is_active");

        if ( !title || !quote || !summary || !content || !cover_url || !published_at ) {
            return fail(400, {
                error: "Tous les champs sont obligatoires",
                values: { title, quote, summary, content, cover_url, published_at }
            });
        }

         // Val(idation stricte côté server (comme Joi)
        if( !title || title.length <2 || title.length >255) {
            return fail(400, {
                error: "Le nom doit contenir entre 2 et 50 caractères",
                values: { title, quote, summary, content, cover_url,published_at}
            });
        }

        if( !quote ||quote.length < 5 ) {
            return fail(400, {
                error: "La citation doit contenir au moins 5 caractères",
                values: { title, quote, summary, content, cover_url,published_at}
            })
        }

        if( !summary ||summary.length < 10 ) {
            return fail(400, {
                error: "La citation doit contenir au moins 10 caractères",
                values: { title, quote, summary, content, cover_url,published_at}
            })
        }

        if( !content ||content.length < 20 ) {
            return fail(400, {
                error: "La citation doit contenir au moins 20 caractères",
                values: { title, quote, summary, content, cover_url,published_at}
            })
        }

        if( !cover_url || (!cover_url.startsWith("http") && !cover_url.startsWith("/")) ) {
            return fail(400, {
                error: "L’URL doit commencer par http ou /",
                values: { title, quote, summary, content, cover_url,published_at}
            })
        }

        if (!published_at) {
            return fail(400, {
                error: "La date de publication est obligatoire",
                values: { title, quote, summary, content, cover_url, published_at }
            });
        }

        // Vérifier que c'est une date valide
        const dateObj = new Date(published_at);
        if (isNaN(dateObj.getTime())) {
            return fail(400, {
                error: "La date de publication doit être une date valide",
                values: { title, quote, summary, content, cover_url, published_at }
            });
        }

        const is_active = is_active_raw === "on" ? true : false;

        try {
            const res = await fetch(`${API_URL}/admin/chronicles`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials:"include",
                body: JSON.stringify({title, quote, summary, content, cover_url, published_at, is_active})
            })

            if(!res.ok) {
                return fail(res.status, {error: "Impossible de creer la chronique"});
            }

            return { success : true};
        } catch (error) {
            console.log(error);
            return fail(500, { error: "Erreur serveur, veuillez réessayer plus tard" });
        }
    }
};