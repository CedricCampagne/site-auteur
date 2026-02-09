<script>
    export let data;
</script>

<section class="flex flex-col gap-6 mt-24 pb-8 border-b">
    <div class="border-b-2 border-accent2">
        <h2 class="text-5xl font-black text-center mb-4">
            Toutes les chroniques
        </h2>
    </div>
    
    <ul class="space-y-2">
        {#each data.chronicles as chronicle}
            <li class="p-2 border-b">
                {chronicle.title}
            </li>
        {/each}
    </ul>

</section>


