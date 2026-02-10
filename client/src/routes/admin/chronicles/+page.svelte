<script>
	import Button from '$lib/components/Button.svelte';
    import ChronicleAdminCard from '$lib/components/ChronicleAdminCard.svelte';

    export let data;
    let chronicles = data.chronicles;

    async function toggleStatus() {
        
        console.log("toggle");

        location.reload();
    }
</script>

<section class="flex flex-col gap-6 mt-24 pb-8 border-b">
    <div class="flex justify-between border-b-2 border-accent2">
        <h2 class="text-5xl font-black text-center mb-4">
            Toutes les chroniques
        </h2>

        <Button
        text="Ajouter une chronique"
        className="bg-accent1 text-white hover:bg-white hover:text-accent1 transition-all duration-500 self-center"
        
        />
    </div>
    
    <ul class="space-y-2">
        {#each chronicles as chronicle}
            <ChronicleAdminCard
                {chronicle}
                onToggle={toggleStatus}
            />
        {/each}
    </ul>

</section>


