<script lang="ts">
	import type { Chronicle } from "$lib/types";
	import ChroniqueCard from "./ChroniqueCard.svelte";

    export let latest3Chronicles : Chronicle[];

</script>

<section class="bg-bg-main p-6 mt-8 mx-15 flex flex-col gap-6 border-b border-accent2">
    <h2 class="text-title text-2xl mb-2">Dernières chroniques</h2>
     <div class="flex gap-3 mt-2">
        {#each latest3Chronicles as chronicle }
        <ChroniqueCard { chronicle}/>            
        {/each}
      
    </div>
</section>