import type { Chronicle, Comment } from "$lib/types";
import { redirect } from "@sveltejs/kit";
// import { getByIdChronicle } from "$lib/api/chronicles.js";


// export async function load({params}) : Promise<{ chronicle: Chronicle}> {
//     const { id, slug } = params;
//     const chronicle = await getByIdChronicle(Number(id), slug);
//     console.log(chronicle);
//     return { chronicle };
// }

export async function load({params, fetch, cookies}) : Promise<{ chronicle: Chronicle, comments:Comment[]}> {
    const token = cookies.get("token");
    // fetch pur récuperer la chronique
    const resChronicle  = await fetch(`${import.meta.env.VITE_API_URL}/chronicles/${params.id}/${params.slug}`);

    // 3. Si backend dit 401
    if (resChronicle.status === 401) {
        throw redirect(303, "/login");
    }
    if (!resChronicle.ok) {
        throw redirect(303, "/login"); }
    
    const chronicle = await resChronicle.json();
   
    
    // fetch pour récuperer les commentaires (avec le user du commentaire) associés a la chronique
    const resComments = await fetch(`${import.meta.env.VITE_API_URL}/chronicles/${params.id}/${params.slug}/comments`);
    
    console.log(`${import.meta.env.VITE_API_URL}/chronicles/${params.id}/${params.slug}/comments`);
    if (resComments.status === 401) {
        throw redirect(303, "/login");
    }
    if (!resComments.ok) {
        throw redirect(303, "/login"); }
    
    const comments = await resComments.json();
   
    return { chronicle, comments };
}