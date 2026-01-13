<script lang="ts">
    import type { Book } from "$lib/types";
	import Button from "./Button.svelte";
    import { formatDateFR} from "../utils/date";

    export let latestbook: Book ;
</script>

{#if latestbook}
    <section class="bg-bg-main p-6">
    <h2 class="text-title text-2xl mb-2">Dernier livre publié</h2>
    <div class="flex gap-4">
        <img src={latestbook.cover_url} alt="couverture livre kuru" class="w-32 h-auto object-cover">
        <div>
            <h2 class="text-title text-2xl mb-2">{latestbook.title}</h2>
            <span>{formatDateFR(latestbook.published_at)}</span>
            <p>{latestbook.summary}</p>
            <div class="mt-8">
                <Button text="Lire un extrait" className="border-2 border-accent2" />
                <Button text="Voir la fiche complete" className="border-2 border-accent2" />
        </div>
        </div>
    </div>
</section>
{:else}
    <p>Aucun livre trouvé.</p>
{/if}
