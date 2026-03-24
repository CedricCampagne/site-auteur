import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

export const actions: Actions = {
    default: async (event) => {
        const { fetch, cookies } = event;
       
        if (!API_URL) throw new Error("API_URL non définie");

        // 1. Appeler ton backend
        await fetch(`${API_URL}/auth/logout`, {
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
