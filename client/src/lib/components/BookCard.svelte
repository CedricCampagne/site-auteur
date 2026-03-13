<script lang="ts">
	import { goto } from "$app/navigation";
	import { getBookUrl } from "$lib/navigation";
	import type { Book } from "$lib/types";
    import { formatDateFR } from "$lib/utils/date";
	import Button from "./Button.svelte";

    export let book: Book;

    function goToBook(){
        goto(getBookUrl(book));
    }
</script>

<article class="flex flex-col gap-4 justify-between items-center bg-white pb-4 shadow-lg shadow-accent2">
    <div class="relative">
        <img
            src={book.cover_url}
            alt="couverture livre"
            class="w-full sm:h-full sm:object-contain md:h-70 md:object-cover {book.is_active === false ? 'opacity-30' : 'opacity-100'}"
        >
        {#if book.is_active === false}
        <div class="absolute inset-0 bg flex items-center justify-center">
            <p class="text-accent2 text-center text-lg font-semibold p-2">image non contractuelle en cours d'édition</p>
        </div>
        {/if}
    </div>
    <h2 class="text-center">{book.title}</h2>
    <p class="text-center text-sm">
        {formatDateFR(book.published_at)}
    </p>
    <Button
        on:click={()=>goToBook()}
        text="Voir le livre"
        className="border-2 text-accent1 border-accent1 hover:text-white hover:bg-accent1 transition-all duration-500"
    />
</article>




    
