<script lang="ts">
	import type { Chronicle } from "$lib/types";
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";
    export let chronicle: Chronicle;
   
    const dispatch = createEventDispatcher();
    function handleToggle() {
    console.log("CLICK TOGGLE");
    dispatch("toggle", chronicle);
}


    function handleDelete() {
        dispatch("delete", chronicle.id_chronicle);
    }
</script>

<section>
    <div class="flex justify-between items-center">
        <div class="flex gap-2">
            <p class="font-bold">{chronicle.title}</p>
            <p>publiée le : {new Date(chronicle.published_at).toLocaleDateString("fr-FR")}</p>
            {#if !chronicle.is_active}
                <span class="text-red-600 font-bold">(inactive)</span>
            {/if}
        </div>
        <div class="flex gap-4">
            <button on:click={handleToggle}>
                <Icon
                    icon="dashicons:update"
                    class="text-4xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>

            <button on:click={handleToggle}>
                <Icon
                    icon="streamline-ultimate:delete-bold"
                    class="text-4xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>

            <button  on:click={handleDelete}>
                <Icon
                    icon="material-symbols:delete-rounded"
                    class="text-4xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>
        </div>
    </div>
</section>