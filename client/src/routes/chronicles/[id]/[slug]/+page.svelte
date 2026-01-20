<script lang="ts">
    export let data;

    const chronicle = data.chronicle;
</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <div class="w-full h-64 sm:h-96 overflow-hidden rounded-b-lg ">
        <img
            src={ chronicle.cover_url }
            alt="Image de { chronicle.title }"
            class="w-full h-full object-cover"
        >
    </div>

    <article class="max-w-3xl mx-auto px-4 sm:px-0 mt-12 mb-24">
        <h2 class="text-4xl sm:text-6xl font-black mb-6 leading-tight">
            { chronicle.title}
        </h2>

        <blockquote class="text-xl italic text-accent1 mb-6">
            { chronicle.quote}
        </blockquote>

        <p class="text-sm text-accent2 mb-12">
            Publié le {new Date(chronicle.published_at).toLocaleDateString("fr-FR")}
        </p>

        <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            {chronicle.content}
        </div>
    </article>
</section>