import type { Handle } from '@sveltejs/kit';



export const handle: Handle = async({ event, resolve })=>{
    event.locals.user= null;

    const token = event.cookies.get("token");
    const API_URL = import.meta.env.VITE_API_URL;
    if (token) {
        try {
            const res = await event.fetch(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                const json = await res.json();
                // 🔹 On stocke l'utilisateur dans locals pour toutes les pages
                event.locals.user = json.data;
            }
        } catch (err) {
            console.error("Erreur dans hook auth:", err);
            // On ne bloque pas la requête : locals.user reste null
        }
    }

    return resolve(event);
};