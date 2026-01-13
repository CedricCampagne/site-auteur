<script lang="ts">
	import type { Book } from "../types"
	import BookCard from "./BookCard.svelte";
    
    export let allbooks :Book[]= [];

</script>

<section class="bg-bg-main p-6 mt-8 mx-15 flex flex-col gap-6 border-b border-accent2">
    <h2 class="text-title text-2xl">Bibliographie</h2>
    <div class="flex gap-3 mt-2">
        {#each allbooks as book}
            <BookCard { book }/>
        {/each}
    </div>
</section>