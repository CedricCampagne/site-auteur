<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { browser } from "$app/environment";
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
    $: contentError = !chronicle.content || chronicle.content.trim().length < 50
        ? "Le contenu doit faire au moins 50 caractères."
        : "";
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

    $: if (browser && $page.form?.success) {
        setTimeout(() => goto('/admin/chronicles'), 1500);
    }
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-4xl font-black text-center mb-4">
        Modification d'une chronique
    </h2>

    <form method="POST" class="flex flex-col gap-4">
    <div class="w-full sm:w-2/4 text-center mx-auto">
        {#if $page.form?.error}
            <p class="bg-red-700 text-white font-semibold p-2 rounded-xs">
                {$page.form.error}
            </p>
        {/if}
        {#if $page.form?.success}   
            <p class="bg-green-600 text-white font-semibold p-2 rounded-xs">
                Chronique mise a jour avec succès !
            </p>
        {/if}
    </div>
        <label>
            Titre
            <input bind:value={chronicle.title} name="title" type="text" class="border p-2 w-full" />
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
            <textarea bind:value={chronicle.quote} name="quote" rows="2" class="border p-2 w-full"></textarea>
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
            <textarea bind:value={chronicle.summary} name="summary"  rows="3" class="border p-2 w-full"></textarea>
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
            <input type="hidden" name="content" bind:value={chronicle.content} />
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
            <input bind:value={chronicle.cover_url} name="cover_url" type="text" class="border p-2 w-full" />
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
            <input bind:value={chronicle.published_at} name="published_at" type="date" class="border p-2 w-full" />
            <div class="h-10 py-2 ">
                {#if dateError}
                    <p class="text-accent1">
                        {dateError}
                    </p>
                {/if}
            </div>
        </label>
        <label class="flex items-center gap-2">
            <input bind:checked={chronicle.is_active} name="is_active" type="checkbox"/>
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

            
        </div>
    </form>
</section>