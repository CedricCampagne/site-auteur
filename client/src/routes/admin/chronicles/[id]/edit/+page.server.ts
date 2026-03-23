import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
// @ts-expect-error can't find module
import { API_URL } from '$env/static/private';

// PageServerLoad type auto de svelteKit pour type load
export const load: PageServerLoad = async ({ params, fetch }) => {

    if (!API_URL) throw new Error("API_URL non définie");

    const id = params.id;

    const res = await fetch(
        `${API_URL}/admin/chronicles/${id}`,
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
