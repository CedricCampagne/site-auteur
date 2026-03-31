import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const VITE_API_URL = import.meta.env.VITE_API_URL;
        const { request, fetch }= event;

        if (!VITE_API_URL) throw new Error("VITE_API_URL non définie")

        const data = await request.formData();

        const username = data.get("username")?.toString().trim();
        const email = data.get("email")?.toString().trim();
        const password = data.get("password")?.toString().trim();
        const confirm = data.get("confirm")?.toString().trim();

        if (!username || !email || !password || !confirm) {
            return fail(400, {
                error: "Tous les champs sont obligatoires",
                values: { username, email }
            });
        }

        if (password !== confirm) {
            return fail(400, {
                error: "Les mots de passe ne correspondent pas",
                values: { username, email }
            });
        }

        const res = await fetch(`${VITE_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                email, 
                password
            })
        });

        const json = await res.json();

        // Si la requête HTTP a échoué
        if (!res.ok) {
            return fail(res.status, {
                error: json.message || "Erreur lors de la création du compte",
                values: { username, email }
            });
        }

        // Si l'API renvoie un type d'erreur
        if (json.type !== "success") {
            return fail(res.status, {
                error: json.message || "Erreur lors de la création du compte",
                values: { username, email }
            });
        }

        return {
            success: "Compte créé avec succès ! Redirection en cours...",
        };
    }
};
