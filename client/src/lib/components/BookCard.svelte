<script lang="ts">
	import type { Book } from "$lib/types";
    import { formatDateFR } from "$lib/utils/date";
	import Button from "./Button.svelte";

    export let book: Book;
</script>

<article class="w-45 flex flex-col gap-4 justify-between items-center bg-white pb-4">
    <img src={book.cover_url} alt="couverture livre" class="w-full h-60 object-cover">
        <p class="text-center">{book.title}</p>
        <p class="text-center text-sm">{formatDateFR(book.published_at)}</p>
        <Button text="Voir le livre" className="border-2 border-accent2" />
</article>
