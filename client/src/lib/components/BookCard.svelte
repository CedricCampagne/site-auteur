<script lang="ts">
	import type { Book } from "$lib/types";
    import { formatDateFR } from "$lib/utils/date";
	import Button from "./Button.svelte";

    export let book: Book;
</script>

<article class="w-2/3 flex flex-col gap-4 justify-between items-center bg-white pb-4 shadow-lg shadow-accent2">
    <img src={book.cover_url} alt="couverture livre" class="w-full sm:h-60 object-cover">
        <p class="text-center">{book.title}</p>
        <p class="text-center text-sm">{formatDateFR(book.published_at)}</p>
        <Button text="Voir le livre" className="border-2 border-accent2 hover:text-white hover:bg-accent2 transition-all duration-500" />
</article>
