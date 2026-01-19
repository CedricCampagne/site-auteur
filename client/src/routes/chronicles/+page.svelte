<script lang="ts">
	import ChroniclesMainCard from '$lib/components/ChroniclesMainCard.svelte';

    export let data;

    const chronicles = data.chronicles;

</script>

<section class="flex flex-col gap-4 mt-24 pb-8 border-b">
    <h2 class="text-5xl font-black text-center mb-4">Chroniques</h2>
    <h3 class="text-center mb-16">Les dernières  réflexions de Katia</h3>
    {#each chronicles as chronicle}
        <ChroniclesMainCard { chronicle } />
    {/each}
</section>