import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async (event) => {
        const VITE_API_URL = import.meta.env.VITE_API_URL;
        const { fetch, cookies } = event;
       
        if (!VITE_API_URL) throw new Error("VITE_API_URL non définie");

        // 1. Appeler ton backend
        await fetch(`${VITE_API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        // 2. Supprimer le cookie côté front
        cookies.delete("token", {
            path: "/"
        });

        // 3. Redirection
        throw redirect(303, "/");
    }
};
