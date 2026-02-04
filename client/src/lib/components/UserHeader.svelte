<script lang="ts">
    import Icon from "@iconify/svelte";

    export let user;

    let open = false;
</script>

<section>
    {#if user}
        <div 
            class="relative"
            on:pointerenter={() => open = true}
            on:pointerleave={() => open = false}
        >
            <div class="flex items-center gap-2 cursor-pointer">
                <Icon icon="mdi:account-circle" class="text-2xl text-accent1" />
                <span>{user.username}</span>
            </div>
            {#if open}
                <div class="absolute right-0 top-full bg-white border rounded shadow p-3 w-40 z-50">
                <form method="POST" action="/logout">
                    <button class="w-full hover:underline underline-offset-4 cursor-pointer text-center ">
                        Se déconnecter
                    </button>
                </form>
                </div>
            {/if}
        </div>
    {:else}
        <div 
            class="relative"
            on:pointerenter={() => open = true}
            on:pointerleave={() => open = false}
        >
        <div class="flex items-center gap-1 cursor-pointer">
            <Icon icon="mdi:account-circle" class="text-2xl text-accent1" />
            <span class="text-sm text-accent1">Compte</span>
        </div>

    {#if open}
        <div class="absolute right-0 top-full bg-white border rounded shadow p-3 w-30 z-50">
            <a href="/login" class="block hover:text-accent1 hover:underline underline-offset-4 cursor-pointer text-center ">Connexion</a>
            <a href="/register" class="block hover:text-accent1 mt-2 hover:underline underline-offset-4 cursor-pointer text-center ">Inscription</a>
        </div>
    {/if}
</div>
        <!-- <section >
            <a
                href="/login"
                class="px-4 py-1 rounded-3xl border border-accent1 text-accent"
            >
                Connexion
            </a>
            <a
                href="/register"
                class="px-4 py-1 rounded-3xl border bg-accent1 text-white"
            >
                Inscription
            </a>
        </section> -->
    {/if}
</section>