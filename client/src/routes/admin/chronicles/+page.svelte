<script lang="ts">
	import Button from '$lib/components/Button.svelte';
    import ChronicleAdminCard from '$lib/components/ChronicleAdminCard.svelte';
    import type { Chronicle } from '$lib/types.js';
    import { goto } from '$app/navigation';
    import { flash, setFlash } from "$lib/stores/flash";
    import { page } from '$app/stores';
    import { replaceState } from '$app/navigation';
    export let data;

    $: {
        const updated = $page.url.searchParams.get("updated");
        if (updated === "1") {
            setFlash("Chronique mise à jour avec succès !");

            // Nettoyer l’URL proprement
            const cleanUrl = $page.url.pathname;
            replaceState(cleanUrl, {});
        }
    }

    let chronicles = data.chronicles;

    function updateChronicle(id: number){
        goto(`/admin/chronicles/${id}/edit`);
    }

    async function toggleStatus(id: number) {
        try {
            console.log("data.chronicles", chronicles);
            console.log("id reçu dans toggleStatus:", id);

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/chronicles/${id}/toggle`,
                {
                    method: "PATCH",
                    credentials: "include"
                }
            );

            if (res.ok) {
                const json = await res.json(); 
                const updated = json.data!;
                // Mise à jour locale comme delete 
                // { ...c, ...updated } fussionne ancien et nouvel objet
                chronicles = chronicles.map((c: Chronicle) => c.id_chronicle === id ? { ...c, ...updated } : c );
                setFlash('Mise a jour du status reussié !');
            } else {
                console.error("Erreur toggle");
            }
        } catch (error) {
            console.error("Erreur toggle");
        }
    }

    async function deleteChronicle(id:number){
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/chronicles/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            const json = await res.json();
            if (json.data === 1) {
                chronicles = chronicles.filter((c: Chronicle) => c.id_chronicle !== id);
                setFlash("Supression de la chronique effectuée !!");
            }
        } catch (error) {
             console.error("Erreur lors de la suppresion");
        }
    }
</script>

<section class="flex flex-col gap-6 mt-24 pb-8 border-b">

    {#if $flash}
        <div class="fixed top-90 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
            {$flash}
        </div>
    {/if}
    <div class="flex justify-between border-b-2 border-accent2">
        <h2 class="text-5xl font-black text-center mb-4">
            Toutes les chroniques ({chronicles.length})
        </h2>       
        <Button
        text="Ajouter une chronique"
        className="bg-accent1 text-white hover:bg-white hover:text-accent1 transition-all duration-500 self-center border border-accent1"
        on:click={()=> goto("/admin/chronicles/create")}
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


