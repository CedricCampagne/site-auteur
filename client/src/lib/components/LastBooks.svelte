<script lang="ts">
    import type { Book } from "$lib/types";
    import Button from "./Button.svelte";
    import { formatDateFR } from "../utils/date";
    import { goto } from "$app/navigation";
    import { getBookUrl } from "$lib/navigation";
    import { createEventDispatcher } from "svelte";

    export let latestbook: Book;

    const dispatch = createEventDispatcher();

    function goToLatest() {
        goto(getBookUrl(latestbook));
    }
</script>

{#if latestbook}
<section class="items-center mt-12 pb-8 border-b flex flex-col gap-4 text-center md:text-start md:items-start">
    <h2 class="text-title text-2xl mb-2">
        Dernier livre publié
    </h2>
    <div class="gap-4 flex flex-col items-center md:flex md:flex-row md:items-center"> 
    <!-- Image avec texte par-dessus, image visible -->
        <div class="relative inline-block">
            <img
                src={latestbook.cover_url}
                alt="couverture livre kuru"
                class="block sm:w-48 sm:min-w-48 h-auto sm:shrink-0 {latestbook.is_active === false ? 'opacity-30' : 'opacity-100'}"
            >
            {#if !latestbook.is_active}
                <span class="absolute inset-0 flex items-center justify-center text-accent2 text-center text-lg font-semibold p-2">
                    image non contractuelle en cours d'édition
                </span>
            {/if}
        </div>
        <div class="flex flex-col items-center gap-2 mt-8 md:items-start">
            <div class="flex flex-col gap-4 sm:flex sm:flex-row sm:items-center">
                <h2 class="text-title text-2xl mb-2">
                    {latestbook.title} <span class="text-accent1">{!latestbook.is_active ? " est en cours d'édition" : ""}</span>
                </h2>
                <span>
                    {formatDateFR(latestbook.published_at)}
                </span>
            </div>
            <p>{latestbook.summary}</p>
            <div class="flex flex-col items-center gap-2 mt-8 sm:flex sm:flex-row sm:items-start">
                <Button
                    text="Lire un extrait"
                    className="text-accent1 border-2 border-accent1 bg-bg-main hover:text-white hover:bg-accent1 transition-all duration-500"
                    on:click={() => dispatch("openExcerpt")}
                />
                <Button
                    text="Voir la fiche complete"
                    className="text-accent2 border-2 border-accent2 bg-bg-main hover:text-white hover:bg-accent2 transition-all duration-500"
                    on:click={() => goToLatest()}
                />
            </div>
        </div>
    </div>
</section>
{:else}
<p>Aucun livre trouvé.</p>
{/if}
