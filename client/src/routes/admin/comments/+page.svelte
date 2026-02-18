<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import { goto } from '$app/navigation';
    import { flash, setFlash} from "$lib/stores/flash";
	import type { Chronicle, Comment, User } from '$lib/types.js';
	import CommentAdminCard from '$lib/components/CommentAdminCard.svelte';

    export let data;

    let comments: Comment[] = data.comments;
    let users: User[] = data.users;
    let chronicles: Chronicle[] = data.chronicles;

    let selectedUser = "";
    let selectedChronicle = "";

    $: filteredComments = comments
    // si selectedUser a une valeur on applique le filtre sinon retoure true
    .filter(c => selectedUser ? c.user_id === Number(selectedUser) : true)
    // idem pour selectedChronicle
    .filter(c => selectedChronicle ? c.chronicle_id === Number(selectedChronicle) : true);

    function clearFilter(){
        selectedUser = "";
        selectedChronicle = "";
    }

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
    <h2 class="text-5xl font-black text-center mb-4">
        Tous les commentaires ({filteredComments.length})
    </h2>
    <div>
        <div class="flex justify-around border-b-2 border-accent2 pb-2">
            <div class="flex items-center gap-2 border p-2">
                <p>Filter par utilisateurs : </p>
                <select
                    bind:value={selectedUser}
                    name="users"
                    id="users"
                    class="text-accent1 p-2 rounded border-0 outline-none focus:outline-none focus:ring-0"
                >
                    <option value="">Tous</option>
                    {#each users as user }
                        <option value={user.id_user}>
                            {user.username}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="flex items-center gap-2 border p-2">
                <p>Filter par chroniques : </p>
                <select 
                    bind:value={selectedChronicle}
                    name="chronicles"
                    id="chronicles"
                    class="text-accent1 p-2 rounded border-0 outline-none focus:outline-none focus:ring-0"
                    >
                    <option value="" class="text-center">Tous</option>
                    {#each chronicles as chronicle }
                        <option class="text-center" value={chronicle.id_chronicle}>
                            {chronicle.title}
                        </option>
                    {/each}
                </select>
            </div>
            <Button
            text="Réinitialiser"
            className="bg-accent1 text-white hover:bg-white hover:text-accent1 transition-all duration-500 self-center border border-accent1"
            on:click={clearFilter}
            />
        </div>
    </div>
    
    <ul class="space-y-2">
        {#each filteredComments as comment}
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