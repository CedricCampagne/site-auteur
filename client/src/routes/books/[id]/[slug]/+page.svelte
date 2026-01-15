<script lang="ts">
	import BookTag from '$lib/components/BookTag.svelte';
    import { formatDateFR } from '$lib/utils/date.js';

    export let data;

    const book = data.book;
    let activTab = "resume"
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <div class="flex gap-8">
        <img src={book.cover_url} alt="" class="flex-1 shadow-lg shadow-accent2">
        <div class="flex-2 flex flex-col gap-12">
            <h2 class="text-5xl">{book.title}</h2>
            <p class="text-2xl">par <span class="text-accent1 font-black">{book.author}</span></p>
            <div class="flex flex-col items-start lg:flex lg:flex-row gap-4">
                <BookTag 
                    text={book.genre}
                    className= {book.genre ? "bg-accent1 text-white" : ""}
                />
                <BookTag
                    text={formatDateFR(book.published_at)}
                />
                <BookTag 
                    text={book.publisher}
                    className= {String(book.published_at) ? "bg-accent2 text-white" : ""}
                />                
            </div>

        </div>
    </div>

    <div class="border-b flex justify-center gap-2 mt-24">
        <button
            on:click={() => activTab = "resume"}
            class={`p-2 text-2xl border-b-2 ${activTab === "resume"
                ? "text-accent1 font-black border-accent1"
                : "text-accent2 border-transparent"
                }`}
        >
            Résumé
        </button>
       <button
            on:click={() => activTab = "extrait"}
            class={`p-2 text-2xl border-b-2 ${activTab === "extrait"
                ? "text-accent1 font-black border-accent1"
                : "text-accent2 border-transparent"
                }`}
        >
            Extrait
        </button>
    </div>

    <div class="mt-8 px-4">
        {#if activTab === "resume"}
        <p>{book.summary}</p>
        {:else if activTab === "extrait"}
        <p>{book.excerpt}</p>
        {/if}
    </div>
</section>