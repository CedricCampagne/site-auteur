import type { Chronicle, Comment } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export async function load({params, fetch}) : Promise<{ chronicle: Chronicle, comments:Comment[]}> {
    // fetch pur récuperer la chronique
    const resChronicle  = await fetch(`${import.meta.env.VITE_API_URL}/chronicles/${params.id}/${params.slug}`);

    // 3. Si backend dit 401
    if (resChronicle.status === 401) {
        throw redirect(303, "/login");
    }
    if (!resChronicle.ok) {
        throw redirect(303, "/login"); }
    
    // const chronicle = await resChronicle.json();
    const jsonChronicle = await resChronicle.json();
    const chronicle: Chronicle = jsonChronicle.data!;
    // fetch pour récuperer les commentaires (avec le user du commentaire) associés a la chronique
    const resComments = await fetch(`${import.meta.env.VITE_API_URL}/chronicles/${params.id}/${params.slug}/comments`);
    
    if (resComments.status === 401) {
        throw redirect(303, "/login");
    }
    if (!resComments.ok) {
        throw redirect(303, "/login"); }
    
    // const comments = await resComments.json();
    const jsonComments = await resComments.json();
    const comments: Comment[] = jsonComments.data!;
  
    return { chronicle, comments };
}

// Validation formulaire

export const actions: Actions= {
    default: async ({request, fetch, params})=> {
        const data = await request.formData();
        const comment = data.get("comment")?.toString();

        const chronicle_id = Number(params.id);
      
        // besoin de verifier si comment est vide ? le front le fait via handleSubmit ?
       if (!comment) {
            return fail(400, {
                error: "Le commentaire ne peut pas etre vide",
                values: { comment }
            });
        }

        if (comment.length < 5) {
            return fail(400, {
                error: "Le commentaire doit contenir au moins de 5 caractères.",
                values: { comment }
            });
        }

        if (comment.length > 1000) {
            return fail(400, {
                error: "Le commentaire ne doit pas dépasser 1000 caractères.",
                values: { comment }
            });
        }
    
        const res = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",         // pour recevoir les cookies
            body: JSON.stringify({
                content: comment,
                chronicle_id: chronicle_id
            })
        })

        if (!res.ok) {
            return fail(res.status, {
                error: "Impossible de créer le commentaire."
            });
        }

        const createdComment = await res.json();

        return {
            status: 200,
            success: true,
            comment: createdComment
        };
    }
}
