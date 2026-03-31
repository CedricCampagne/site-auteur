<script lang="ts">
	import BibliographyBookCard from "$lib/components/BibliographyBookCard.svelte";
    export let data;

    const books = data.books;
</script>

<svelte:head>
    <title>Bibliographie – Les livres de Katia Campagne</title>
    <meta 
        name="description" 
        content="Découvrez tous les livres de Katia Campagne, auteure de thrillers psychologiques : résumés, années de publication et informations sur chaque roman." 
    />
</svelte:head>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-5xl font-black text-center mb-4">
        Bibliographie
    </h2>
    <h3 class="text-center mb-16">
        Tous les livres de Katia, classés par année
    </h3>
    <!-- Timeline -->
    <div class="relative border-l-4 border-accent2 pl-8 space-y-16">
        {#each books as book, i (i)}
            <div class="relative">
                <!-- Point sur la ligne -->
                <div class="absolute -left-11.5 top-1 w-6 h-6 bg-accent1 rounded-full border-2 border-accent2"></div>
                <!-- Année -->
                <p class="text-accent1 font-bold text-lg mb-2">
                    {new Date(book.published_at).getFullYear()}
                </p>
                <BibliographyBookCard
                    { book }
                />
            </div>
        {/each}
    </div>
</section>