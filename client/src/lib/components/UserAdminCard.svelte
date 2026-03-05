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
        dispatch("update", user.id_user);
    }

    function handleDelete() {
        dispatch("delete", user.id_user);
    }
</script>

<section class="border p-4 rounded bg-white shadow flex flex-col gap-3">
    <!-- Infos -->
    <div class="flex flex-col gap-1">
        <div class="flex items-center gap-2">
            <p class="font-bold text-lg">
                {user.username}
            </p>
        </div>

        {#if user.email}
            <p class="text-gray-600 text-sm">
                {user.email}
            </p>
        {/if}
        <p class="text-gray-500 text-xs">
            Créé le {new Date(user.created_at).toLocaleDateString("fr-FR")}
        </p>
    </div>
    <!-- Actions -->
    <div class="flex gap-4 justify-between">
        <div>
            {#if !user.is_active}
                <span class="text-red-600 font-bold text-sm border p-1">
                    Inactif
                </span>
            {/if}
        </div>
        <div>
            <button on:click={handleUpdate}>
                <Icon
                    icon="material-symbols:edit"
                    class="text-3xl p-1 border border-accent1 bg-white text-accent1 hover:bg-accent1 hover:text-white transition-all duration-500"
                />
            </button>

            <button on:click={handleToggle}>
                <Icon
                    icon={user.is_active ? "mdi:toggle-switch" : "mdi:toggle-switch-off"}
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
