import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

export const load : PageServerLoad = async ({ fetch, params}) => {
   
    if (!API_URL) throw new Error("API_URL non définie");

    const id = params.id;

    const res = await fetch(`${API_URL}/admin/users/${id}`, {
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });

    if(!res.ok){
        throw redirect(302, '/admin/chronicles');   
    }

    const json = await res.json();
    const user = json.data!;

    return { user };
}

export const actions: Actions = {
    default: async( event ) => {
        const { request, fetch, params}= event;

        const id = params.id;
        const data = await request.formData();

        const username = data.get("username")?.toString();
        const email = data.get("email")?.toString();
        const password_raw = data.get("password")?.toString() || "";
        const is_active_raw = data.get("is_active");

        if ( !email || !username) {
            return fail(400, {
                error: "Tous les champs sont obligatoires",
                values: { email, username }
            });
        }

        // Validation stricte côté server (comme Joi)
        if (!username || username.length < 2 || username.length > 50) {
            return fail(400, { error: "Le nom doit contenir entre 2 et 50 caractères", values: { username, email } });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return fail(400, {
                error: "Email invalide",
                values: { username, email }
            });
        }

        let password: string | undefined;
        if (password_raw.trim().length > 0) {
            if (password_raw.length < 10 || !/[A-Z]/.test(password_raw)) {
                return fail(400, {
                    error: "Le mot de passe doit contenir au moins 10 caractères et une majuscule",
                    values: { username, email }
                });
            }
            password = password_raw;
        }

        const is_active = is_active_raw === "on" ? true : false;
        
        // Construire le body pour le PUT
        const body: any = { username, email, is_active };
        if (password) body.password = password;

        try {
            const res = await fetch(`${API_URL}/admin/users/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(body)
            })
            
            if(!res.ok) {
                return fail(res.status, {error: "Impossible de mettre a jour l'utilisateur"});
            }

            return { success: true };
        } catch (error) {
            console.log(error);
            return fail(500, { error: "Erreur serveur, veuillez réessayer plus tard" });
        }
    }
}