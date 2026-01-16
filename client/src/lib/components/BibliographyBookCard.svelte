<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { goto } from "$app/navigation";
    import { getBookUrl } from "$lib/navigation";

    export let book;

    const maxLength = 150;
</script>

<section class="bg-white shadow-lg shadow-accent2 rounded p-6 flex flex-col sm:flex-row gap-6">
    <img 
        src={book.cover_url} 
        alt="Couverture du livre {book.title}" 
        class="w-full sm:w-40 h-56 object-cover rounded"
    />
    <div class="flex flex-col justify-between">
        <div>
            <h2 class="text-2xl font-semibold mb-2">{book.title}</h2>

            <p class="text-sm text-gray-700 line-clamp-3">
                {book.excerpt.length > maxLength ? book.excerpt.slice(0,maxLength) + "..." : book.excerpt}
            </p>
        </div>
        <Button
            text="Voir le livre"
            className="mt-4 border-2 text-accent1 border-accent1 hover:bg-accent1 hover:text-white transition-all duration-300 w-fit"
            on:click={() => goto(getBookUrl(book))}
        />
    </div>
</section>