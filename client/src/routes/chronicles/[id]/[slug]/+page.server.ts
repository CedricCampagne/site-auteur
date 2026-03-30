// +page.server.ts
import type { Chronicle, Comment } from "$lib/types";
import { redirect, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch, cookies, locals }) => {
    const VITE_API_URL = import.meta.env.VITE_API_URL
    if (!VITE_API_URL) throw new Error("VITE_API_URL non définie");

    //Si pas de token ou utilisateur non authentifié
    if (!locals.user || !locals.token) {
        cookies.set("flash", "Vous devez être connecté pour accéder à cette page", { path: "/", maxAge: 15 });
        throw redirect(303, "/login");
    }

    const token = locals.token;

    const headers = {
        Authorization: `Bearer ${token}`
    };

    //Fetch chronique
    const resChronicle = await fetch(`${VITE_API_URL}/chronicles/${params.id}/${params.slug}`, {
        headers,
        credentials: "include"
    });

    if (resChronicle.status === 401) {
        cookies.set("flash", "Vous devez être connecté pour accéder à cette page", { path: "/", maxAge: 15 });
        throw redirect(303, "/login");
    }
    if (!resChronicle.ok) throw redirect(303, "/login");

    const jsonChronicle = await resChronicle.json();
    const chronicle: Chronicle = jsonChronicle.data!;

    //Fetch commentaires
    const resComments = await fetch(`${VITE_API_URL}/chronicles/${params.id}/${params.slug}/comments`, {
        headers,
        credentials: "include"
    });

    if (resComments.status === 401) throw redirect(303, "/login");
    if (!resComments.ok) throw redirect(303, "/login");

    const jsonComments = await resComments.json();
    const comments: Comment[] = jsonComments.data!;

    return { chronicle, comments, user: locals.user };
};

//Actions pour poster un commentaire
export const actions: Actions = {
    default: async ({ request, fetch, params, locals, cookies }) => {
        const VITE_API_URL = import.meta.env.API_URL
        if (!VITE_API_URL) throw new Error("VITE_API_URL non définie");

        const comment = (await request.formData()).get("comment")?.toString();
        const chronicle_id = Number(params.id);

        if (!locals.user || !locals.token) {
            cookies.set("flash", "Vous devez être connecté pour poster un commentaire", { path: "/", maxAge: 15 });
            throw redirect(303, "/login");
        }

        if (!comment || comment.length < 5 || comment.length > 1000) {
            let errorMessage = "";

            if (!comment) {
                errorMessage = "Le commentaire ne peut pas être vide.";
            } else if (comment.length < 5) {
                errorMessage = "Le commentaire doit contenir au moins 5 caractères.";
            } else if (comment.length > 1000) {
                errorMessage = "Le commentaire ne doit pas dépasser 1000 caractères.";
            }

            return fail(400, {
                error: errorMessage,
                values: { comment }
            });
        }

        const token = locals.token;
        const res = await fetch(`${VITE_API_URL}/comments`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            credentials: "include",
            body: JSON.stringify({ content: comment, chronicle_id })
        });

        if (!res.ok) return fail(res.status, { error: "Impossible de créer le commentaire." });

        const createdComment = await res.json();

        return { status: 200, success: true, comment: createdComment };
    }
};