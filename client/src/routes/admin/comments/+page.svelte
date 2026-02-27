<script lang="ts">
    import Icon from '@iconify/svelte';
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
                const json = await res.json();
                const updated = json.data!;
                comments = comments.map((c: Comment) => c.id_comment === id ? { ...c, ...updated } : c );

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
            const json = await res.json();
            // pour use le retour de .destroy de sequelize du back return nombre de ligne supprimée
            if(json.data === 1){
                comments = comments.filter((c: Comment)=> c.id_comment !== id);
                setFlash("Supression du commentaire effectué !");
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

    <h2 class="text-4xl font-black text-center mb-4">
        Tous les commentaires ({filteredComments.length})
    </h2>

    <div class="border-b-2 border-accent2 pb-2 flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-center ">
        <div class="flex flex-col gap-2 border border-accent2 py-3 px-4 rounded-md bg-white shadow-sm w-fit">
            <p class="text-sm font-semibold text-accent2">
                Filtrer par utilisateur :
            </p>

            <select
                bind:value={selectedUser}
                name="users"
                id="users"
                class="appearance-none bg-white border border-accent2 
                    text-accent2 px-4 py-2 pr-10 rounded-md 
                    shadow-sm cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-accent1 focus:border-accent1
                    transition-all duration-200"
            >
                <option value="">Tous</option>
                {#each users as user}
                    <option value={user.id_user}>
                        {user.username}
                    </option>
                {/each}
            </select>
        </div>

        <div class="flex flex-col gap-2 border border-accent2 py-3 px-4 rounded-md bg-white shadow-sm w-fit">
            <p class="text-sm font-semibold text-accent2">
                Filtrer par chroniques :
            </p>

            <select
                bind:value={selectedChronicle}
                name="users"
                id="users"
                class="appearance-none bg-white border border-accent2 
                    text-accent2 px-4 py-2 pr-10 rounded-md 
                    shadow-sm cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-accent1 focus:border-accent1
                    transition-all duration-200"
            >
                <option value="">Tous</option>
                {#each chronicles as chronicle}
                    <option value={chronicle.id_chronicle}>
                        {chronicle.title}
                    </option>
                {/each}
            </select>
        </div>

        <button
            on:click={clearFilter}
            class="flex items-center justify-center 
                w-12 h-12 rounded-full 
                border border-accent2 
                text-accent2 bg-white
                hover:bg-accent1 hover:text-white hover:border-accent1
                transition-all duration-300 shadow-sm"
            title="Réinitialiser les filtres"
        >
            <Icon icon="material-symbols:restart-alt-rounded" class="text-2xl" />
    </button>
    </div>
   
    <ul class="space-y-2">
        {#if filteredComments.length === 0}
            <p class="border p-4 rounded bg-white shadow text-center"> Pas de commentaires pour ces filtres</p>
        {/if}
        {#each filteredComments as comment}
            <CommentAdminCard
                {comment}
                on:toggle={(e) => toggleStatus(e.detail)}
                on:delete={(e) => deleteComment(e.detail)}
                on:update={(e)=> updateComment(e.detail)}
            />
        {/each}
    </ul>   
</section>