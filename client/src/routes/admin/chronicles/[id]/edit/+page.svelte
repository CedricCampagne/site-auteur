<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Chronicle } from '$lib/types.js';
    import { toInputDate } from '$lib/utils/date.js';
    import MarkdownEditor from "$lib/components/MarkdownEditor.svelte";
    export let data;

    const chronicle: Chronicle = structuredClone(data.chronicle);

    // Convertir la date pour l’input
    chronicle.published_at = toInputDate(chronicle.published_at);


    // Validation automatique
    $: titleError = chronicle.title.trim().length < 3 ? "Le titre doit faire au moins 3 caractères." : "";
    $: quoteError = chronicle.quote.trim().length < 10 ? "La citation doit faire au moins 10 caractères." : "";
    $: summaryError = chronicle.summary.trim().length < 20 ? "Le résumé doit faire au moins 20 caractères." : "";
    $: contentError = chronicle.content.trim().length < 50 ? "Le contenu doit faire au moins 50 caractères." : "";
    $: urlError =
    (!chronicle.cover_url.startsWith("http") && !chronicle.cover_url.startsWith("/"))
        ? "L’URL doit commencer par http ou /"
        : "";

    $: dateError = !chronicle.published_at ? "La date est obligatoire." : "";

    // Form valid si aucune erreur
    $: isFormValid =
        !titleError &&
        !quoteError &&
        !summaryError &&
        !contentError &&
        !urlError &&
        !dateError;

    let successMessage = "";
    let errorMessage = "";

    async function handleSubmit() {
    successMessage = "";
    errorMessage = "";

    if (!chronicle.title.trim()) {
        errorMessage = "Le titre est obligatoire";
        return;
    }

    if (chronicle.summary.trim().length < 20) {
        errorMessage = "Le résumé doit faire au moins 20 caractères";
        return;
    }

    if (chronicle.content.trim().length < 50) {
        errorMessage = "Le contenu est trop court";
        return;
    }

    if (
        !chronicle.cover_url.startsWith("http") &&
        !chronicle.cover_url.startsWith("/")
    ) {
        errorMessage = "L’URL de l’image doit commencer par http ou /";
        return;
    }

    if (!chronicle.published_at) {
        errorMessage = "La date est obligatoire";
        return;
    }

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
    <h2 class="text-4xl font-black text-center mb-4">
        Création d'une chronique
    </h2>

    <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4" > 
        <label>
            Titre
            <input bind:value={chronicle.title} type="text" class="border p-2 w-full" />
            <div class="h-10 py-2">
                {#if titleError}
                    <p class="text-accent1">
                        {titleError}
                    </p>
                {/if}
            </div>
        </label>
        <label>
            Citation
            <textarea bind:value={chronicle.quote} rows="2" class="border p-2 w-full"></textarea>
            <div class="h-10 py-2">
                {#if quoteError}
                    <p class="text-accent1">
                        {quoteError}
                    </p>
                {/if}
            </div>
        </label>
        <label>
            Résumé
            <textarea bind:value={chronicle.summary}  rows="3" class="border p-2 w-full"></textarea>
            <div class="h-10 py-2">
                {#if summaryError}
                    <p class="text-accent1">
                        {summaryError}
                    </p>
                {/if}
            </div>
        </label>
        <label>
            Contenu (Markdown)
            <MarkdownEditor
                value={chronicle.content}
                onChange={(v) => chronicle.content = v}
            />
            <div class="h-10 py-2">
                {#if contentError}
                    <p class="text-accent1">
                        {contentError}
                    </p>
                {/if}
            </div>
        </label>
        <label>
            URL de l’image
            <input bind:value={chronicle.cover_url} type="text" class="border p-2 w-full" />
            <div class="h-10 py-2">
                {#if urlError}
                    <p class="text-accent1">
                        {urlError}
                    </p>
                {/if}
            </div>
        </label>
        <label>
            Date de publication :
            <input bind:value={chronicle.published_at} type="date" class="border p-2 w-full" />
            <div class="h-10 py-2 ">
                {#if dateError}
                    <p class="text-accent1">
                        {dateError}
                    </p>
                {/if}
            </div>
        </label>
        <label class="flex items-center gap-2">
            <input bind:checked={chronicle.is_active} type="checkbox"/>
            Activer la chronique
        </label>

        <div class="flex items-center gap-6">
            <button
                type="submit"
                class="max-w-50 bg-accent2 text-white px-4 py-2 rounded hover:bg-accent1 transition-all duration-500"
                disabled={!isFormValid}
            >
                Mise a jour de la chronique
            </button>

            {#if successMessage}
                <p class="bg-green-600 text-white font-semibold p-2 rounded-xs">
                    {successMessage}
                </p>
            {/if}

            {#if errorMessage}
                <p class="bg-red-700 text-white font-semibold p-2 rounded-xs">
                    {errorMessage}
                </p>
            {/if}
        </div>
    </form>
</section>