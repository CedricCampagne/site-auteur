import { redirect } from "@sveltejs/kit";

export async function handle({ event , resolve }){
    // event = objet qui représente la requête entrante
    // resolve = fontion pour dire ok passe ala route demandée (analogie next() middlware Express)
    console.log('-----event du hook----', event);
    const token = event.cookies.get("token");
    console.log("-----token du hook-----", token);

    // Protéger uniquement la route détail d'une chronique
    if (event.url.pathname.match(/^\/chronicles\/\d+\/[^/]+$/)) {
        if (!token) {
            throw redirect(303, "/login?reason=auth");
        }
    }

    return resolve(event);
}
