// +page.server.ts
import type { Chronicle, Comment, User } from "$lib/types";
import { redirect, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ params, fetch, cookies, locals }) => {
    if (!API_URL) throw new Error("API_URL non définie");

    // 🔹 Récupérer le token soit depuis locals (hook SSR), soit fallback cookie
    let token: string | undefined = locals.user?.token || cookies.get("token");

    // 🔹 Vérification token / récupération user côté serveur
    if (!locals.user && token) {
        try {
            const resUser = await fetch(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!resUser.ok) {
                cookies.set("flash", "Token invalide ou expiré", { path: "/", maxAge: 15 });
                throw redirect(303, "/login");
            }

            locals.user = (await resUser.json()).data as User & { token?: string };
            locals.user.token = token; // 🔹 on garde le token dans locals.user pour fetch suivants
        } catch (err) {
            console.error("Erreur fetch /auth/me:", err);
            cookies.set("flash", "Erreur lors de l'authentification", { path: "/", maxAge: 15 });
            throw redirect(303, "/login");
        }
    }

    // 🔹 Si pas de token ou utilisateur non authentifié
    if (!locals.user || !token) {
        cookies.set("flash", "Vous devez être connecté pour accéder à cette page", { path: "/", maxAge: 15 });
        throw redirect(303, "/login");
    }

    token = locals.user.token;

    const headers = {
        Authorization: `Bearer ${token}`
    };

    // 🔹 Fetch chronique
    const resChronicle = await fetch(`${API_URL}/chronicles/${params.id}/${params.slug}`, {
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

    // 🔹 Fetch commentaires
    const resComments = await fetch(`${API_URL}/chronicles/${params.id}/${params.slug}/comments`, {
        headers,
        credentials: "include"
    });

    if (resComments.status === 401) throw redirect(303, "/login");
    if (!resComments.ok) throw redirect(303, "/login");

    const jsonComments = await resComments.json();
    const comments: Comment[] = jsonComments.data!;

    return { chronicle, comments, user: locals.user };
};

// 🔹 Actions pour poster un commentaire
export const actions: Actions = {
    default: async ({ request, fetch, params, locals, cookies }) => {
        if (!API_URL) throw new Error("API_URL non définie");

        const comment = (await request.formData()).get("comment")?.toString();
        const chronicle_id = Number(params.id);

        if (!locals.user) {
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

        const token = locals.user.token;
        const res = await fetch(`${API_URL}/comments`, {
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