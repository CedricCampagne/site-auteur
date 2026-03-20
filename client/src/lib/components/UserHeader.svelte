<script lang="ts">
	import { clickOutside } from "$lib/utils/clickOutside";
    import Icon from "@iconify/svelte";

    export let user;

    let open = false;

    function toggleOpen(){
        open =!open
    }

    function close(){
        open = false;
    }
</script>

<section use:clickOutside={close}>
    {#if user}
        <div class="relative">
            <button 
                class="flex items-center gap-2 cursor-pointer"
                on:click={toggleOpen}
            >
                <Icon
                    icon="mdi:account-circle"
                    class="text-2xl text-accent1"
                />
                <span>
                    {user.username}
                </span>
            </button>
            {#if open}
                <div class="absolute right-0 top-full bg-white border rounded shadow p-3 w-40 z-50 flex flex-col">
                    {#if user.roles && user.roles.includes("admin")}
                        <a 
                            href="/admin"
                            class="hover:underline underline-offset-4 cursor-pointer text-center"
                        >
                            Administration
                        </a>
                    {/if}
                    <form method="POST" action="/logout">
                        <button class="w-full hover:underline underline-offset-4 cursor-pointer">
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
                <Icon
                    icon="mdi:account-circle"
                    class="text-2xl text-accent1"
                />
                <span class="text-sm text-accent1">
                    Compte
                </span>
            </div>
            {#if open}
                <div class="absolute right-0 top-full bg-white border rounded shadow p-3 w-30 z-50">
                    <a
                        href="/login"
                        class="block hover:text-accent1 hover:underline underline-offset-4 cursor-pointer text-center "
                    >
                        Connexion
                    </a>
                    <a
                        href="/register"
                        class="block hover:text-accent1 mt-2 hover:underline underline-offset-4 cursor-pointer text-center "
                    >
                        Inscription
                    </a>
                </div>
            {/if}
        </div>
    {/if}
</section>