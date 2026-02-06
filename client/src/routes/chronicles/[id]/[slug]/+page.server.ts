import type { Chronicle, Comment } from "$lib/types";
import { redirect } from "@sveltejs/kit";

export async function load({params, fetch}) : Promise<{ chronicle: Chronicle, comments:Comment[]}> {
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

