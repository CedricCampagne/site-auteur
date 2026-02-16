<script lang="ts">
	import type { Chronicle } from "$lib/types";
	import ChroniqueCard from "./ChroniqueCard.svelte";

    export let latest3Chronicles : Chronicle[];

</script>

<section class="flex flex-col  gap-4 mt-12 pb-8 border-b">
    <h2 class="text-center md:text-start text-title text-2xl">Dernières chroniques</h2>
     <div class="flex flex-col items-center gap-4 md:flex md:flex-row">
        {#each latest3Chronicles as chronicle }
        <ChroniqueCard { chronicle }/>
        {/each}
    </div>
</section>