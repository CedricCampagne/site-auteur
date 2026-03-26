import { redirect } from "@sveltejs/kit";
import type { JwtPayload } from "$lib/types";

function decodeJwt(token: string | undefined): JwtPayload | null {
    try {
        if (!token) return null;

        //  jwt ressemble a ca xxxx.yyyy.zzzz
        // xxxxx = header (base64url)
        // yyyyy = payload (base64url)
        // zzzzz = signature
        // decoupe le token recupere yyyy = payload
        const payload = token.split(".")[1];
        // met en base64 classique
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        // convertit en text
        const decoded = Buffer.from(base64, "base64").toString("utf8");
        // transforme le text en objet JS
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

export async function handle({ event, resolve }) {
    const token = event.cookies.get("token");

    // Protection des pages nécessitant d'être connecté
    if (event.url.pathname.match(/^\/chronicles\/\d+\/[^/]+$/)) {
        if (!token) {
            event.cookies.set("flash", "Connectez-vous pour accéder à cette page.", {
                path: "/",
                maxAge: 5
            });
            throw redirect(303, "/login");
        }

        const payload = decodeJwt(token);

    if (!payload) {
        event.cookies.set("flash", "Connectez-vous pour accéder à cette page.", {
            path: "/",
            maxAge: 5
        });
        throw redirect(303, "/login");
    }
    }

    // Protection de toutes les routes admin
    if (event.url.pathname.startsWith("/admin")) {

        if (!token) {
            throw redirect(303, "/login");
        }

        const payload = decodeJwt(token);

        if (!payload || !payload.roles?.includes("admin")) {
            event.cookies.set("flash", "Vous n’avez pas les droits pour accéder à cette page.", {
                path: "/",
                maxAge: 5
            });
            throw redirect(303, "/");
        }
    }

    return resolve(event);
}

