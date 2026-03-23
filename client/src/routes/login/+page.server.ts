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
        const setCookie = res.headers.get("set-cookie");
        if (setCookie) { const token = setCookie.split(";")[0].split("=")[1];
            // Reposer le cookie côté navigateur
            cookies.set("token", token, {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                secure: false, // en dev
                maxAge: 3600
            });
        }
        return { success: "Connexion réalisée avec succès ! Redirection en cours..."}
    }
}

export const load: PageServerLoad = ({ cookies }) =>{
   const flash = cookies.get("flash");

   if(flash){
    cookies.delete("flash", { path: "/"});
   }

   return { flash };
}
