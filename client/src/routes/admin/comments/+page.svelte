<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import { goto } from '$app/navigation';
    import { flash, setFlash} from "$lib/stores/flash";
	import type { Comment } from '$lib/types.js';
	import CommentAdminCard from '$lib/components/CommentAdminCard.svelte';

    export let data;

    let comments: Comment[] = data.comments;

    async function toggleStatus(id: number){
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/comments/${id}/toggle`,
                {
                    method: "PATCH",
                    credentials: "include"
                }
            );
            
            if(res.ok){
                const updated = await res.json();
                comments = comments.map((c: Comment) => c.id_comment === id ? updated : c );

                setFlash('Mise a jour du status reussié !');
            } else {
                console.error("Erreur toggle status");
            }
        } catch (error) {
            console.error("Erreur toggle");
        }
    }

    async function deleteComment(id: number) {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/comments/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );
            if(res.ok){
                comments = comments.filter((c: Comment)=> c.id_comment !== id);
                setFlash("Supression du commentaire effectué !!");
            }
        } catch (error) {
             console.error("Erreur lors de la suppresion du commentaire");
        }
    }

    function updateComment(id: number){
        goto(`/admin/comments/${id}/edit`);
    }
</script>

<section class="flex flex-col gap-6 mt-24 pb-8 border-b">

    {#if $flash}
        <div class="fixed top-15 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {$flash}
        </div>
    {/if}
    <div class="flex justify-between border-b-2 border-accent2">
        <h2 class="text-5xl font-black text-center mb-4">
            Tous les commentaires ({comments.length})
        </h2>       
        <Button
        text="Ajouter un utilisateur"
        className="bg-accent1 text-white hover:bg-white hover:text-accent1 transition-all duration-500 self-center border border-accent1"
        on:click={()=> goto("/admin/users/create")}
        />
    </div>
    
    <ul class="space-y-2">
        {#each comments as comment}
            <CommentAdminCard
                {comment}
                on:toggle={(e) => toggleStatus(e.detail)}
                on:delete={(e) => deleteComment(e.detail)}
                on:update={(e)=> updateComment(e.detail)}
            />
            <!-- <UserAdminCard
                {comment}
                on:update={(e)=> updateUser(e.detail)}
            /> -->
        {/each}
    </ul>   
</section>