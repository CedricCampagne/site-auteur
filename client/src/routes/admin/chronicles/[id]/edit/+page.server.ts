import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const id = params.id;

    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/chronicles/${id}`,
        {
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!res.ok) {
        throw redirect(302, '/admin/chronicles');
    }

    const chronicle = await res.json();

    return {
        chronicle
    };
};
