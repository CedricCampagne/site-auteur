<script lang="ts">
	import Button from '$lib/components/Button.svelte';
    import ChronicleAdminCard from '$lib/components/ChronicleAdminCard.svelte';
    import type { Chronicle } from '$lib/types.js';

    export let data;
    let chronicles = data.chronicles;

    async function toggleStatus(chronicle: Chronicle) {
  
    location.reload();
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
            />
        {/each}
    </ul>
</section>


