import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

// PageServerLoad type auto de svelteKit pour type load
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

    const json = await res.json();
    const chronicle = json.data!;

    return { chronicle };
};
