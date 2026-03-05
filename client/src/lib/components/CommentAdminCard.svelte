<script lang="ts">
	import type { Comment } from "$lib/types";
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";

    export let comment: Comment;

    const dispatch = createEventDispatcher();

    async function handleToggle(){
        dispatch("toggle", comment.id_comment);
    }

    function handleUpdate() {
        console.log("DISPATCH UPDATE", comment.id_comment);
        dispatch("update", comment.id_comment);
    }

    function handleDelete() {
        dispatch("delete", comment.id_comment);
    }
</script>

<section class="border p-4 rounded bg-white shadow flex flex-col gap-3">
    <!-- Infos -->
    <div class="flex flex-col gap-2">
        <div class="flex flex-col gap-2 md:flex-row">
            <strong>Auteur :</strong>
            <p>
                {comment.user.username}
            </p>
        </div>
        <div class="flex flex-col gap-2 md:flex-row">
            <strong>Chronique :</strong>
            <p>
                {comment.chronicle.title}
            </p>
        </div>
        <p class="italic text-gray-700">
            "{comment.content.length > 80 
                ? comment.content.slice(0, 80) + '...' 
                : comment.content}"
        </p>
        <div class="h-8">
             {#if !comment.is_visible}
                <span class="text-red-600 font-bold border p-1">
                    Masqué
                </span>
            {/if}
        </div>
    </div>
    <!-- Actions -->
    <div class="flex gap-4 justify-end">
        <div>
            <button on:click={handleUpdate}>
                <Icon 
                    icon="material-symbols:edit"
                    class="text-3xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>
            <button on:click={handleToggle}>
                <Icon
                    icon={comment.is_visible ? "mdi:toggle-switch" : "mdi:toggle-switch-off"}
                    class="text-3xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>
            <button on:click={handleDelete}>
                <Icon 
                    icon="material-symbols:delete-rounded"
                    class="text-3xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>
        </div>
    </div>
</section>
