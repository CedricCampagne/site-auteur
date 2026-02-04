import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ fetch, cookies }) => {

        // 1. Appeler ton backend
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
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
