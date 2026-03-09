<script lang="ts">
    import type { Book } from "$lib/types";
	import Button from "./Button.svelte";
    import { formatDateFR} from "../utils/date";
	import { goto } from "$app/navigation";
    import { getBookUrl } from "$lib/navigation";
    export let latestbook: Book ;
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    function goToLatest() {
        goto(getBookUrl(latestbook));
    }
</script>

{#if latestbook}
    <section class="items-center mt-12 pb-8 border-b flex flex-col gap-4 text-center sm:text-start sm:items-start">
        <h2 class="text-title text-2xl mb-2">
            Dernier livre publié
        </h2>
        <div class="gap-4 flex flex-col items-center sm:flex sm:flex-row sm:items-center">
            <img
                src={latestbook.cover_url}
                alt="couverture livre kuru"
                class="w-50 border shadow-lg shadow-accent2"
            >
            <div class="flex flex-col items-center gap-2 mt-8 sm:items-start">
            <div class="flex flex-col gap-4 sm:flex sm:flex-row sm:items-center">
                <h2 class="text-title text-2xl mb-2">
                    {latestbook.title}
                </h2>
                <span>
                    {formatDateFR(latestbook.published_at)}
                </span>
            </div>
                <p class="">
                    {latestbook.summary}
                </p>
                <div class="flex flex-col items-center gap-2 mt-8 sm:flex sm:flex-row sm:items-start">
                    <Button
                        text="Lire un extrait"
                        className=" text-accent1 border-2 border-accent1 bg-bg-main hover:text-white hover:bg-accent1 transition:all duration-500"
                        on:click={()=> dispatch("openExcerpt") }
                    />
                    <Button text="Voir la fiche complete"
                        className="text-accent2 border-2 border-accent2 bg-bg-main hover:text-white hover:bg-accent2 transition:all duration-500"
                        on:click={()=> goToLatest()}
                    />
                </div>
            </div>
        </div>
    </section>
{:else}
    <p>Aucun livre trouvé.</p>
{/if}

