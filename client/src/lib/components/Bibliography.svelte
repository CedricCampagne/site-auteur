<script lang="ts">
	import type { Book } from "../types"
	import BookCard from "./BookCard.svelte";
    
    export let allbooks :Book[]= [];

</script>

<section class="flex flex-col gap-4 mt-12 pb-8 border-b">
    <h2 class="text-center md:text-start text-title text-2xl">Bibliographie</h2>
    <div class="flex flex-col items-center gap-4 md:flex md:flex-row md:gap-4">
        {#each allbooks as book}
            <BookCard { book }/>
        {/each}
    </div>
</section>
