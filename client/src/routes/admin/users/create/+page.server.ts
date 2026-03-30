import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    default: async (event) => {
        const VITE_API_URL = import.meta.env.VITE_API_URL;

        const { request, fetch, locals } = event;

        const data = await request.formData();

        const username = data.get("username")?.toString();
        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();

        if ( !email || !password || !username) {
            return fail(400, {
                error: "Tous les champs sont obligatoires",
                values: { email, username }
            });
        }

        // Validation stricte côté server (comme Joi)
        if (!username || username.length < 2 || username.length > 50) {
            return fail(400, { error: "Le nom doit contenir entre 2 et 50 caractères", values: { username, email } });
        }

        if (!email) {
            return fail(400, { error: "L’email est obligatoire", values: { username, email } });
        }

        if (!password || password.length < 10 || password.length > 200 || !/[A-Z]/.test(password)) {
            return fail(400, {
                error: "Le mot de passe doit contenir au moins 10 caractères et une lettre majuscule",
                values: { username, email }
            });
        }

        try {
           const res = await fetch(`${VITE_API_URL}/admin/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${locals.token}`
            },
            body: JSON.stringify({username, email, password})
        });

        if(!res.ok) {
            return fail(res.status, {error: "Impossible de creer l'utilisateur"});
        }

        return { success: true}; 
        } catch (error) {
            console.log(error);
            return fail(500, { error: "Erreur serveur, veuillez réessayer plus tard" });
        }
    }
}

export const load = ({ locals, cookies }) => {
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

    return {};
};