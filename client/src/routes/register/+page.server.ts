import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, fetch }) => {
        const data = await request.formData();

        const username = data.get("username")?.toString();
        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();
        const confirm = data.get("confirm")?.toString();

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

        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                email, 
                password
            })
        });

        const json = await res.json();

        if (json.type === "fail") {
    
            return fail(res.status, {
                error: json.message,
                values: { username, email }
            });
        }

        return {
            success: "Compte créé avec succès ! Redirection en cours...",
        };
    }
};
