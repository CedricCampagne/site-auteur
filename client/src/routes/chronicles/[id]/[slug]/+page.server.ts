import type { Chronicle } from "$lib/types";
import { redirect } from "@sveltejs/kit";
// import { getByIdChronicle } from "$lib/api/chronicles.js";


// export async function load({params}) : Promise<{ chronicle: Chronicle}> {
//     const { id, slug } = params;
//     const chronicle = await getByIdChronicle(Number(id), slug);
//     console.log(chronicle);
//     return { chronicle };
// }

export async function load({params, fetch, cookies}) : Promise<{ chronicle: Chronicle}> {
    const token = cookies.get("token");

    const res  = await fetch(`${import.meta.env.VITE_API_URL}/chronicles/${params.id}/${params.slug}`, {
        headers : {
            cookie: `token=${token}`
        }
    });

    // 3. Si backend dit 401
    if (res.status === 401) {
        throw redirect(303, "/login");
    }
    if (!res.ok) {
        throw redirect(303, "/login"); }
    
    const chronicle = await res.json();
   
    return { chronicle };
}