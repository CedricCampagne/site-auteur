import type { Chronicle } from "$lib/types";
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
            cookie: `token= ${token}`
        }
    });

    if (!res.ok) { throw new Error("Non autorisé"); } const chronicle = await res.json();
   
    return { chronicle };
}