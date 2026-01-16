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

<article class="w-2/3 flex flex-col gap-4 justify-between items-center bg-white pb-4 shadow-lg shadow-accent2">
    <img src={book.cover_url} alt="couverture livre" class="w-full sm:h-60 object-cover">
        <h2 class="text-center">{book.title}</h2>
        <p class="text-center text-sm">{formatDateFR(book.published_at)}</p>
        <Button
            on:click={()=>goToBook()}
            text="Voir le livre"
            className="border-2 text-accent1 border-accent1 hover:text-white hover:bg-accent1 transition-all duration-500"
        />
</article>
