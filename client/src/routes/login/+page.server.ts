import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request, fetch, cookies })=>{
        // console.log("ACTION LOGIN APPELÉE");
        const data = await request.formData();

        const email = data.get("email")?.toString();
        const password = data.get("password")?.toString();

        if ( !email || !password) {
            return fail(400, {
                error: "Tous les champs sont obligatoires",
                values: { email }
            });
        }

        // console.log("AVANT FETCH", import.meta.env.VITE_API_URL);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",         // pour recevoir les cookies
            body: JSON.stringify({email, password })
        });
        // console.log("APRES FETCH", res.status);
        // console.log("COOKIES RECUS PAR SVELTEKIT :", res.headers.get("set-cookie"));

        const json = await res.json();

        if (!res.ok) {
            const msg =
                Array.isArray(json?.error)
                    ? json.error.join(" / ")
                    : json?.error ||
                      json?.message ||
                      "Erreur lors de la connexion";

            return fail(res.status, {
                error: msg,
                values: { email }
            });
        }

        // Récupérer le cookie envoyé par ton backend
        const setCookie = res.headers.get("set-cookie");
        // console.log("setCookie", setCookie);
        if (setCookie) { const token = setCookie.split(";")[0].split("=")[1];

            // console.log("token apres split", token);

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
