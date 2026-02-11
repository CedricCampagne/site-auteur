<script lang="ts">
	import Button from '$lib/components/Button.svelte';
    import ChronicleAdminCard from '$lib/components/ChronicleAdminCard.svelte';
    import type { Chronicle } from '$lib/types.js';
    import { goto } from '$app/navigation';

    export let data;

    let chronicles = data.chronicles;

    function updateChronicle(id: number){
        goto(`/admin/chronicles/${id}/edit`);
    }
    
    async function toggleStatus(id: number) {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/chronicles/${id}/toggle`,
                {
                    method: "PATCH",
                    credentials: "include"
                }
            );

            if (res.ok) {
                location.reload();
            } else {
                console.error("Erreur toggle");
            }
        } catch (error) {
            console.error("Erreur toggle");
        }
    }

    async function deleteChronicle(id:number){
        await fetch(`${import.meta.env.VITE_API_URL}/admin/chronicles/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
        chronicles = chronicles.filter((c: Chronicle)=> c.id_chronicle !== id);
    }
</script>

<section class="flex flex-col gap-6 mt-24 pb-8 border-b">
    <div class="flex justify-between border-b-2 border-accent2">
        <h2 class="text-5xl font-black text-center mb-4">
            Toutes les chroniques
        </h2>

        <Button
        text="Ajouter une chronique"
        className="bg-accent1 text-white hover:bg-white hover:text-accent1 transition-all duration-500 self-center border border-accent1"
        
        />
    </div>
    
    <ul class="space-y-2">
        {#each chronicles as chronicle}
            <ChronicleAdminCard
                {chronicle}
                on:toggle={(e) => toggleStatus(e.detail)}
                on:delete={(e) => deleteChronicle(e.detail)}
                on:update={(e)=> updateChronicle(e.detail)}
            />
        {/each}
    </ul>
</section>


