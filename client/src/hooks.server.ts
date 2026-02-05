import { redirect } from "@sveltejs/kit";

export async function handle({ event , resolve }){
    // event = objet qui représente la requête entrante
    // resolve = fontion pour dire ok passe ala route demandée (analogie next() middlware Express)
    const token = event.cookies.get("token");

    // Protéger uniquement la route détail d'une chronique
    if (event.url.pathname.match(/^\/chronicles\/\d+\/[^/]+$/)) {
        if (!token) {
            event.cookies.set("flash","Connectez-vous pour accéder à cette page.", {
                path: "/",
                maxAge: 5
            });

            throw redirect(303, "/login");
        }
    }
    return resolve(event);
}
