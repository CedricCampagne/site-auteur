<script lang="ts">
    import type { Chronicle } from "$lib/types";
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";

    export let chronicle: Chronicle;
   
    const dispatch = createEventDispatcher();

    function handleToggle() {
        dispatch("toggle", chronicle.id_chronicle);
    }

    function handleUpdate() {
        console.log("DISPATCH UPDATE", chronicle.id_chronicle);
        dispatch("update", chronicle.id_chronicle);
    }

    function handleDelete() {
        dispatch("delete", chronicle.id_chronicle);
    }
</script>

<!-- <section> -->
<section class="border p-4 rounded bg-white shadow">
    <div class="flex flex-col items-center gap-4 md:flex md:flex-row md:justify-between md:items-center">
        <div class="flex flex-col items-center gap-2 sm:flex sm:flex-row ">
            <p class="font-bold">{chronicle.title}</p>
            <p>publiée le : {new Date(chronicle.published_at).toLocaleDateString("fr-FR")}</p>
            <div>
                {#if !chronicle.is_active}
                    <span class="text-red-600 font-bold border p-1 ">Inactive</span>
                {/if}
            </div>
        </div>

        <div class="flex gap-4">

            <button on:click={handleUpdate}>
                <Icon
                    icon="material-symbols:edit"
                    class="text-4xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>

            <button on:click={handleToggle}>
                <Icon
                    icon={chronicle.is_active ? "mdi:toggle-switch" : "mdi:toggle-switch-off"}
                    class="text-4xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>

            <button on:click={handleDelete}>
                <Icon
                    icon="material-symbols:delete-rounded"
                    class="text-4xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>

        </div>
    </div>
</section>
