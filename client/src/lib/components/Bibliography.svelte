<script lang="ts">
	import type { Book } from "../types"
	import BookCard from "./BookCard.svelte";
    
    export let allbooks :Book[]= [];

</script>

<section class="flex flex-col gap-4 mt-12 pb-4 border-b">
    <h2 class="text-title text-2xl">Bibliographie</h2>
    <div class="flex gap-4">
        {#each allbooks as book}
            <BookCard { book }/>
        {/each}
    </div>
</section>
