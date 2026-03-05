<script lang="ts">
	import BookTag from '$lib/components/BookTag.svelte';
    import { formatDateFR } from '$lib/utils/date.js';

    export let data;

    const book = data.book;
    let activTab = "resume"
</script>

{#if book }
    <section class="flex flex-col gap-4 mt-24 pb-8 border-b">
        <div class="flex flex-col items-center gap-24 md:flex-row md:gap-8 md:self-center">
            <div class="w-75 h-112.5 overflow-hidden rounded-md shadow-lg shadow-accent2">
                <img 
                    src={book.cover_url} 
                    alt={book.title} 
                    class="w-full h-full object-cover"
                />
                </div>
                <div class="flex-2 flex flex-col gap-12">
                    <h2 class="text-5xl">
                        {book.title}
                    </h2>
                    <p class="text-2xl">
                        par <span class="text-accent1 font-black">{book.author}</span>
                    </p>
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
                            className= {book.publisher ? "bg-accent2 text-white" : ""}
                        />                
                    </div>
                </div>
        </div>
        <div class="flex justify-center gap-2 mt-24">
            <button
                on:click={() => activTab = "resume"}
                class={`p-2 text-2xl border-b-2 cursor-pointer ${activTab === "resume"
                    ? "text-accent1 font-black border-accent1"
                    : "text-accent2 border-transparent"
                    }`}
            >
                Résumé
            </button>
        <button
                on:click={() => activTab = "extrait"}
                class={`p-2 text-2xl border-b-2 cursor-pointer ${activTab === "extrait"
                    ? "text-accent1 font-black border-accent1"
                    : "text-accent2 border-transparent"
                }`}
            >
                Extrait
            </button>
        </div>
        <div class="text-content mt-8 px-4 py-4 border-t">
            {#if activTab === "resume"}
                {#each book.summary.trim().split('\n\n') as paragraph, i (i)}
                    <p class="text-lg leading-7 mb-4">
                        <!-- Le contenu vient uniquement du seed ou de l'admin (EasyMDE), donc pas de risque XSS. -->
                        {@html paragraph.replace(/\n/g, '<br>')}
                    </p>
                {/each}
            {:else if activTab === "extrait"}
                {#each book.excerpt.trim().split('\n\n') as paragraph, i (i)}
                    <p class="text-lg leading-7 mb-4">
                        <!-- Le contenu vient uniquement du seed ou de l'admin (EasyMDE), donc pas de risque XSS. -->
                        {@html paragraph.replace(/\n/g, '<br>')}
                    </p>
                {/each}
            {/if}
        </div>
    </section>    
{:else}
    <section>
        Pas de livre trouvé.
    </section>
{/if}