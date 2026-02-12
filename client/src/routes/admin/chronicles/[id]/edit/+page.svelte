<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Chronicle } from '$lib/types.js';
    import { toInputDate } from '$lib/utils/date.js';

    export let data;

    const chronicle: Chronicle = structuredClone(data.chronicle);

    // Convertir la date pour l’input
    chronicle.published_at = toInputDate(chronicle.published_at);

    let successMessage = "";
    let errorMessage = "";

    async function handleSubmit() {
        successMessage = "";
        errorMessage = "";

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/admin/chronicles/${chronicle.id_chronicle}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(chronicle)
                }
            );

            if (res.ok) {
                goto('/admin/chronicles?updated=1');
            } else {
                errorMessage = "Erreur lors de la mise à jour";
            }
        } catch (err) {
            errorMessage = "Impossible de contacter le serveur";
        }
    }
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-5xl font-black text-center mb-4">Mise à jour de la chronique</h2>

    <form class="flex flex-col gap-4" on:submit|preventDefault={handleSubmit}>
        
        <label>
            Titre
            <input type="text" bind:value={chronicle.title} class="border p-2 w-full" />
        </label>

        <label>
            Citation
            <textarea bind:value={chronicle.quote} rows="2" class="border p-2 w-full"></textarea>
        </label>

        <label>
            Résumé
            <textarea bind:value={chronicle.summary} rows="3" class="border p-2 w-full"></textarea>
        </label>

        <label>
            Contenu (Markdown)
            <textarea bind:value={chronicle.content} rows="10" class="border p-2 w-full"></textarea>
        </label>

        <label>
            URL de l’image
            <input type="text" bind:value={chronicle.cover_url} class="border p-2 w-full" />
        </label>

        <label>
            Date de publication :
            <input type="date" bind:value={chronicle.published_at} class="border p-2 w-full" />
        </label>

        <label class="flex items-center gap-2">
            <input type="checkbox" bind:checked={chronicle.is_active} />
            Activer la chronique
        </label>

        <div class="flex items-center gap-6">
            <button type="submit" class="max-w-50 bg-accent2 text-white px-4 py-2 rounded hover:bg-accent1 transition-all duration-500">
                Mettre à jour
            </button>

            {#if successMessage}
                <p class="bg-green-600 text-white font-semibold p-2 rounded-xs">{successMessage}</p>
            {/if}

            {#if errorMessage}
                <p class="bg-red-700 text-white font-semibold p-2 rounded-xs">{errorMessage}</p>
            {/if}
        </div>
    </form>
</section>
