<script lang="ts">
	import type { Chronicle } from "$lib/types";
    import Icon from "@iconify/svelte";

    export let chronicle: Chronicle;
    export let onToggle: (c: Chronicle) => void;
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
            <Icon
                icon="dashicons:update"
                class="text-4xl p-1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
            />
            <Icon
                icon="streamline-ultimate:delete-bold"
                class="text-4xl p-1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                on:click={()=> onToggle(chronicle)}
            />
            <Icon
                icon="material-symbols:delete-rounded"
                class="text-4xl p-1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
            />
        </div>
    </div>
</section>