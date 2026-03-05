import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, fetch, cookies })=>{
        const data = await request.formData();

        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();

        if ( !email || !password) {
            return fail(400, {
                error: "Tous les champs sont obligatoires",
                values: { email }
            });
        }

        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
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

export function load({ cookies }){
   const flash = cookies.get("flash");

   if(flash){
    cookies.delete("flash", { path: "/"});
   }

   return { flash };
}
