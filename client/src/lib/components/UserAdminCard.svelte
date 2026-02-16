<script lang="ts">
    import type { User } from "$lib/types";
    import Icon from "@iconify/svelte";
    import { createEventDispatcher } from "svelte";

    export let user: User;
   
    const dispatch = createEventDispatcher();

    function handleToggle() {
        dispatch("toggle", user.id_user);
    }

    function handleUpdate() {
        console.log("DISPATCH UPDATE", user.id_user);
        dispatch("update", user.id_user);
    }

    function handleDelete() {
        dispatch("delete", user.id_user);
    }
</script>

<section>
    <div class="flex justify-between items-center">
        <div class="flex gap-2">
            <p class="font-bold"> - {user.username}</p>
            {#if !user.is_active}
                <span class="text-red-600 font-bold">(inactive)</span>
            {/if}
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
                    icon={user.is_active ? "mdi:toggle-switch" : "mdi:toggle-switch-off"}
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
