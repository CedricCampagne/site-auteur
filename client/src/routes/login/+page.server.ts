import { redirect } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from './$types';
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

export const actions: Actions = {
    default: async ( event )=>{
        const { request, fetch, cookies } = event;
        if (!API_URL) throw new Error("API_URL non définie");

        const data = await request.formData();

        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();

        if ( !email || !password) {
            return fail(400, {
                error: "Tous les champs sont obligatoires",
                values: { email }
            });
        }

        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",         // pour recevoir les cookies
            body: JSON.stringify({email, password })
        });

        const json = await res.json();

        if (json.type === "fail") {
   
            return fail(res.status, {
                error: json.message,
                values: { email }
            });
        }

        // Récupérer le cookie envoyé par ton backend
        const isProd = process.env.NODE_ENV === "production";

        const token = json.data.token;

        cookies.set("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
            maxAge: 3600
        });

        cookies.set("flash", "Connexion réussie !", {
            path: "/",
            maxAge: 5
        });

        throw redirect(303, "/");
    }
}

export const load: PageServerLoad = ({ cookies }) =>{
   const flash = cookies.get("flash");

   if(flash){
    cookies.delete("flash", { path: "/"});
   }

   return { flash };
}
